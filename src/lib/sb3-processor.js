/**
 * SB3 Project Processing Utilities
 * Handles decompression, validation, and recompression of Scratch .sb3 projects
 */

import JSZip from "jszip";

// Chunk size for efficient Uint8Array to binary string conversion
const CHUNK_SIZE = 8192; // Process in 8KB chunks

/**
 * Converts base64 compressed .sb3 data to JSON project data
 * @param {string} base64Data - Base64 encoded .sb3 file data
 * @returns {Promise<Object>} - Promise resolving to the project JSON data
 */
export const decompressSB3ToJSON = async (base64Data) => {
    try {
        // Convert base64 to binary data
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Load the ZIP file
        const zip = await JSZip.loadAsync(bytes);

        // Extract project.json from the ZIP
        const projectFile = zip.file("project.json");
        if (!projectFile) {
            throw new Error("project.json not found in .sb3 file");
        }

        // Read and parse the project JSON
        const projectContent = await projectFile.async("text");
        const projectData = JSON.parse(projectContent);

        return projectData;
    } catch (error) {
        throw new Error(`Failed to decompress SB3 to JSON: ${error.message}`);
    }
};

/**
 * Converts JSON project data back to base64 compressed .sb3 data
 * @param {Object} projectData - The project JSON data
 * @param {JSZip} [originalZip] - Optional original ZIP to preserve other files
 * @returns {Promise<string>} - Promise resolving to base64 encoded .sb3 data
 */
export const compressJSONToSB3 = async (projectData, originalZip = null) => {
    try {
        // Create a new ZIP or use the original one
        const zip = originalZip || new JSZip();

        // Add the updated project.json to the ZIP
        const projectJson = JSON.stringify(projectData);
        zip.file("project.json", projectJson);

        // Generate the ZIP file as binary
        const zipBlob = await zip.generateAsync({
            type: "uint8array",
            compression: "DEFLATE",
            compressionOptions: { level: 6 },
        });

        // Convert to base64 using chunked approach for better performance
        let binaryString = "";
        for (let i = 0; i < zipBlob.length; i += CHUNK_SIZE) {
            const chunk = zipBlob.subarray(i, i + CHUNK_SIZE);
            binaryString += String.fromCharCode.apply(null, chunk);
        }

        return btoa(binaryString);
    } catch (error) {
        throw new Error(`Failed to compress JSON to SB3: ${error.message}`);
    }
};

/**
 * Validates and fixes isStage property in project targets
 * @param {Object} projectData - The project JSON data
 * @returns {Object} - Object with validation results and fixed data
 */
export const validateAndFixIsStage = (projectData) => {
    if (
        !projectData ||
        !projectData.targets ||
        !Array.isArray(projectData.targets)
    ) {
        throw new Error("Invalid project data: targets array not found");
    }

    const result = {
        hasIssues: false,
        issues: [],
        fixedData: JSON.parse(JSON.stringify(projectData)), // Deep copy
    };

    // Find all targets with isStage: true
    const stageTargets = [];
    projectData.targets.forEach((target, index) => {
        if (target.isStage === true) {
            stageTargets.push(index);
        }
    });

    // Check for issues
    if (stageTargets.length === 0) {
        result.hasIssues = true;
        result.issues.push(
            "No stage target found (first target should have isStage: true)"
        );

        // Fix: Set first target as stage
        if (result.fixedData.targets.length > 0) {
            result.fixedData.targets[0].isStage = true;
            result.fixedData.targets[0].layerOrder = 0;
        }
    } else if (stageTargets.length > 1) {
        result.hasIssues = true;
        result.issues.push(
            `Multiple stage targets found at indices: ${stageTargets.join(
                ", "
            )}`
        );

        // Fix: Only first target should be stage
        result.fixedData.targets.forEach((target, index) => {
            if (index === 0) {
                target.isStage = true;
                target.layerOrder = 0;
            } else {
                target.isStage = false;
                // Ensure non-stage targets have proper layerOrder
                if (
                    typeof target.layerOrder !== "number" ||
                    target.layerOrder < 1
                ) {
                    target.layerOrder = index;
                }
            }
        });
    } else if (stageTargets[0] !== 0) {
        result.hasIssues = true;
        result.issues.push(
            `Stage target found at wrong position (index ${stageTargets[0]}, should be 0)`
        );

        // Fix: Move stage properties to first target
        const stageIndex = stageTargets[0];
        const stageTarget = result.fixedData.targets[stageIndex];
        const firstTarget = result.fixedData.targets[0];

        // Swap the targets
        result.fixedData.targets[0] = {
            ...stageTarget,
            isStage: true,
            layerOrder: 0,
        };
        result.fixedData.targets[stageIndex] = {
            ...firstTarget,
            isStage: false,
            layerOrder: stageIndex,
        };
    }

    return result;
};

/**
 * Complete processing function: base64 in → JSON validation/fix → base64 out
 * @param {string} base64Data - Base64 encoded .sb3 file data
 * @returns {Promise<Object>} - Promise resolving to processing result
 */
export const processSB3Data = async (base64Data) => {
    try {
        // Step 1: Decompress to JSON
        const projectData = await decompressSB3ToJSON(base64Data);
        // Step 2: Validate and fix isStage issues
        const validationResult = validateAndFixIsStage(projectData);
        // Step 3: If there were issues, recompress with fixed data
        let outputBase64 = base64Data; // Default to original if no issues

        if (validationResult.hasIssues) {
            // We need to preserve the original ZIP structure, so let's reload it
            const binaryString = atob(base64Data);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const originalZip = await JSZip.loadAsync(bytes);

            // Compress with fixed data
            outputBase64 = await compressJSONToSB3(
                validationResult.fixedData,
                originalZip
            );
        }

        return {
            success: true,
            hadIssues: validationResult.hasIssues,
            issues: validationResult.issues,
            originalData: projectData,
            fixedData: validationResult.fixedData,
            outputBase64: outputBase64,
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            hadIssues: false,
            issues: [],
            originalData: null,
            fixedData: null,
            outputBase64: null,
        };
    }
};

/**
 * Simple function to just get JSON from base64 .sb3 data
 * @param {string} base64Data - Base64 encoded .sb3 file data
 * @returns {Promise<Object>} - Promise resolving to the project JSON data
 */
export const convertSB3ToJSON = async (base64Data) => {
    return await decompressSB3ToJSON(base64Data);
};
