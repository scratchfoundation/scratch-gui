/**
 * Project data validation and sanitization utilities for SB2/SB3 projects
 */

/**
 * Validates and sanitizes SB3 project data
 * @param {Object} projectData - The project data to validate
 * @returns {Object} - Sanitized project data or throws error if unfixable
 */
export const validateAndSanitizeSB3 = (projectData) => {
    if (!projectData || typeof projectData !== "object") {
        throw new Error("Invalid project data: must be an object");
    }

    // Create a copy to avoid mutating original
    const sanitized = JSON.parse(JSON.stringify(projectData));

    // Ensure required top-level properties exist
    if (!sanitized.targets) {
        sanitized.targets = [];
    }

    if (!sanitized.monitors) {
        sanitized.monitors = [];
    }

    if (!sanitized.extensions) {
        sanitized.extensions = [];
    }

    if (!sanitized.meta) {
        sanitized.meta = {
            semver: "3.0.0",
            vm: "0.2.0",
            agent: "scratch-gui",
        };
    }

    // Validate and fix targets
    sanitized.targets = sanitized.targets.map((target, index) => {
        const fixedTarget = { ...target };

        // Ensure stage (first target) has correct layerOrder
        if (index === 0) {
            fixedTarget.layerOrder = 0;
            fixedTarget.isStage = true;
        } else {
            // Ensure sprites have valid layerOrder
            if (
                typeof fixedTarget.layerOrder !== "number" ||
                fixedTarget.layerOrder < 1
            ) {
                fixedTarget.layerOrder = index;
            }
            fixedTarget.isStage = false;
        }

        // Ensure required target properties
        if (!fixedTarget.name) {
            fixedTarget.name = index === 0 ? "Stage" : `Sprite${index}`;
        }

        if (!fixedTarget.variables) {
            fixedTarget.variables = {};
        }

        if (!fixedTarget.lists) {
            fixedTarget.lists = {};
        }

        if (!fixedTarget.broadcasts) {
            fixedTarget.broadcasts = {};
        }

        if (!fixedTarget.blocks) {
            fixedTarget.blocks = {};
        }

        if (!fixedTarget.comments) {
            fixedTarget.comments = {};
        }

        if (!fixedTarget.costumes) {
            fixedTarget.costumes = [];
        }

        if (!fixedTarget.sounds) {
            fixedTarget.sounds = [];
        }

        // For sprites, ensure position properties
        if (index > 0) {
            if (typeof fixedTarget.x !== "number") {
                fixedTarget.x = 0;
            }
            if (typeof fixedTarget.y !== "number") {
                fixedTarget.y = 0;
            }
            if (typeof fixedTarget.size !== "number") {
                fixedTarget.size = 100;
            }
            if (typeof fixedTarget.direction !== "number") {
                fixedTarget.direction = 90;
            }
            if (typeof fixedTarget.draggable !== "boolean") {
                fixedTarget.draggable = false;
            }
            if (typeof fixedTarget.rotationStyle !== "string") {
                fixedTarget.rotationStyle = "all around";
            }
        }

        return fixedTarget;
    });

    // Ensure we have at least a stage
    if (sanitized.targets.length === 0) {
        sanitized.targets.push({
            isStage: true,
            name: "Stage",
            variables: {},
            lists: {},
            broadcasts: {},
            blocks: {},
            comments: {},
            costumes: [],
            sounds: [],
            layerOrder: 0,
        });
    }

    return sanitized;
};

/**
 * Validates and sanitizes SB2 project data
 * @param {Object} projectData - The project data to validate
 * @returns {Object} - Sanitized project data or throws error if unfixable
 */
export const validateAndSanitizeSB2 = (projectData) => {
    if (!projectData || typeof projectData !== "object") {
        throw new Error("Invalid project data: must be an object");
    }

    // Create a copy to avoid mutating original
    const sanitized = JSON.parse(JSON.stringify(projectData));

    // Ensure required SB2 properties
    if (!sanitized.objName) {
        sanitized.objName = "Stage";
    }

    if (!sanitized.scripts) {
        sanitized.scripts = [];
    }

    if (!sanitized.sounds) {
        sanitized.sounds = [];
    }

    if (!sanitized.costumes) {
        sanitized.costumes = [];
    }

    if (!sanitized.children) {
        sanitized.children = [];
    }

    if (!sanitized.variables) {
        sanitized.variables = [];
    }

    if (!sanitized.lists) {
        sanitized.lists = [];
    }

    // Fix children (sprites) if they exist
    if (Array.isArray(sanitized.children)) {
        sanitized.children = sanitized.children.map((child, index) => {
            const fixedChild = { ...child };

            if (!fixedChild.objName) {
                fixedChild.objName = `Sprite${index + 1}`;
            }

            if (!fixedChild.scripts) {
                fixedChild.scripts = [];
            }

            if (!fixedChild.sounds) {
                fixedChild.sounds = [];
            }

            if (!fixedChild.costumes) {
                fixedChild.costumes = [];
            }

            if (!fixedChild.variables) {
                fixedChild.variables = [];
            }

            if (!fixedChild.lists) {
                fixedChild.lists = [];
            }

            // Ensure numeric properties for sprites
            if (typeof fixedChild.scratchX !== "number") {
                fixedChild.scratchX = 0;
            }
            if (typeof fixedChild.scratchY !== "number") {
                fixedChild.scratchY = 0;
            }
            if (typeof fixedChild.scale !== "number") {
                fixedChild.scale = 1;
            }
            if (typeof fixedChild.direction !== "number") {
                fixedChild.direction = 90;
            }

            return fixedChild;
        });
    }

    return sanitized;
};

/**
 * Attempts to detect and validate project format
 * @param {Object} projectData - The project data to validate
 * @returns {Object} - Object with format info and sanitized data
 */
export const validateProject = (projectData) => {
    if (!projectData || typeof projectData !== "object") {
        throw new Error("Invalid project data: must be an object");
    }

    let format = "unknown";
    let sanitizedData = null;
    let errors = [];

    // Try to detect and validate as SB3 first
    if (projectData.targets || projectData.meta) {
        format = "sb3";
        try {
            sanitizedData = validateAndSanitizeSB3(projectData);
        } catch (error) {
            errors.push(`SB3 validation failed: ${error.message}`);
        }
    }

    // If SB3 failed or wasn't detected, try SB2
    if (
        !sanitizedData &&
        (projectData.objName || projectData.scripts || projectData.children)
    ) {
        format = "sb2";
        try {
            sanitizedData = validateAndSanitizeSB2(projectData);
        } catch (error) {
            errors.push(`SB2 validation failed: ${error.message}`);
        }
    }

    // If both failed, try to auto-repair as SB3 (most common format)
    if (!sanitizedData) {
        format = "sb3";
        try {
            // Create a minimal valid SB3 project
            sanitizedData = validateAndSanitizeSB3({
                targets: [],
                monitors: [],
                extensions: [],
                meta: {
                    semver: "3.0.0",
                    vm: "0.2.0",
                    agent: "scratch-gui",
                },
            });
            errors.push(
                "Project data was severely corrupted and has been reset to a blank project"
            );
        } catch (error) {
            errors.push(`Failed to create fallback project: ${error.message}`);
            throw new Error(
                `Unable to validate or repair project data: ${errors.join(
                    ", "
                )}`
            );
        }
    }

    return {
        format,
        data: sanitizedData,
        errors: errors.length > 0 ? errors : null,
    };
};

/**
 * Validates project data from base64 content
 * @param {string} base64Content - Base64 encoded project content
 * @returns {Object} - Validation result with parsed and sanitized data
 */
export const validateProjectFromBase64 = (base64Content) => {
    if (!base64Content || typeof base64Content !== "string") {
        throw new Error("Invalid base64 content");
    }

    try {
        // Decode base64 to binary
        const binaryString = atob(base64Content);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        // Try to parse as JSON (for uncompressed projects)
        try {
            const jsonString = new TextDecoder().decode(bytes);
            const projectData = JSON.parse(jsonString);
            return validateProject(projectData);
        } catch (jsonError) {
            // If JSON parsing fails, it might be a compressed .sb3 file
            // In this case, we'll let the VM handle the decompression
            // and validation will happen after loading
            return {
                format: "compressed",
                data: base64Content,
                errors: [
                    "Project appears to be compressed - validation will occur after VM loading",
                ],
            };
        }
    } catch (error) {
        throw new Error(`Failed to process base64 content: ${error.message}`);
    }
};
