/**
 * Render Analysis Debug Script
 *
 * This script can be pasted into the browser console to help analyze
 * component render patterns and detect potential infinite renders.
 *
 * Usage:
 * 1. Open browser DevTools (F12)
 * 2. Go to Console tab
 * 3. Paste this entire script and press Enter
 * 4. Use the application normally
 * 5. Call analyzeRenders() to see the analysis
 */

// Global variables to track renders
window.renderTracker = {
    logs: [],
    startTime: Date.now(),
    componentCounts: {},
    lastRenderTimes: {},
    suspiciousPatterns: [],
};

// Override console.log to capture our render logs
const originalConsoleLog = console.log;
console.log = function (...args) {
    // Call original console.log first
    originalConsoleLog.apply(console, args);

    // Check if this is one of our render logs
    const message = args[0];
    if (
        typeof message === "string" &&
        (message.includes("🔄 GUIComponent RENDER:") ||
            message.includes("🧱 Blocks") ||
            message.includes("🎭 StageWrapperComponent RENDER:") ||
            message.includes("🎯 TargetPane"))
    ) {
        const timestamp = Date.now();
        const logEntry = {
            timestamp,
            message,
            data: args[1] || {},
            component: extractComponentName(message),
        };

        window.renderTracker.logs.push(logEntry);

        // Track component render counts
        const component = logEntry.component;
        window.renderTracker.componentCounts[component] =
            (window.renderTracker.componentCounts[component] || 0) + 1;

        // Check for rapid re-renders (potential infinite renders)
        if (window.renderTracker.lastRenderTimes[component]) {
            const timeDiff =
                timestamp - window.renderTracker.lastRenderTimes[component];
            if (timeDiff < 100) {
                // Less than 100ms between renders
                window.renderTracker.suspiciousPatterns.push({
                    component,
                    timeDiff,
                    timestamp,
                    message: `Rapid re-render detected: ${component} rendered ${timeDiff}ms after previous render`,
                });
            }
        }
        window.renderTracker.lastRenderTimes[component] = timestamp;
    }
};

function extractComponentName(message) {
    if (message.includes("🔄 GUIComponent")) return "GUIComponent";
    if (message.includes("🧱 Blocks")) return "Blocks";
    if (message.includes("🎭 StageWrapperComponent"))
        return "StageWrapperComponent";
    if (message.includes("🎯 TargetPane")) return "TargetPane";
    return "Unknown";
}

// Analysis functions
window.analyzeRenders = function () {
    const tracker = window.renderTracker;
    const totalTime = Date.now() - tracker.startTime;

    console.group("🔍 RENDER ANALYSIS REPORT");
    console.log(`📊 Analysis Period: ${(totalTime / 1000).toFixed(2)} seconds`);
    console.log(`📝 Total Render Logs: ${tracker.logs.length}`);

    console.group("📈 Component Render Counts");
    Object.entries(tracker.componentCounts)
        .sort(([, a], [, b]) => b - a)
        .forEach(([component, count]) => {
            const rate = (count / (totalTime / 1000)).toFixed(2);
            console.log(`${component}: ${count} renders (${rate} renders/sec)`);
        });
    console.groupEnd();

    if (tracker.suspiciousPatterns.length > 0) {
        console.group("⚠️ SUSPICIOUS PATTERNS (Potential Infinite Renders)");
        tracker.suspiciousPatterns.forEach((pattern) => {
            console.warn(pattern.message);
        });
        console.groupEnd();
    } else {
        console.log("✅ No suspicious rapid re-render patterns detected");
    }

    console.group("🕐 Recent Renders (Last 10)");
    tracker.logs.slice(-10).forEach((log) => {
        const timeFromStart = (
            (log.timestamp - tracker.startTime) /
            1000
        ).toFixed(2);
        console.log(`[${timeFromStart}s] ${log.message}`, log.data);
    });
    console.groupEnd();

    console.groupEnd();

    return {
        totalRenders: tracker.logs.length,
        componentCounts: tracker.componentCounts,
        suspiciousPatterns: tracker.suspiciousPatterns,
        analysisTime: totalTime,
    };
};

window.clearRenderTracking = function () {
    window.renderTracker = {
        logs: [],
        startTime: Date.now(),
        componentCounts: {},
        lastRenderTimes: {},
        suspiciousPatterns: [],
    };
    console.log("🧹 Render tracking data cleared");
};

window.getRendersByComponent = function (componentName) {
    return window.renderTracker.logs.filter(
        (log) => log.component === componentName
    );
};

window.getRecentRenders = function (seconds = 10) {
    const cutoff = Date.now() - seconds * 1000;
    return window.renderTracker.logs.filter((log) => log.timestamp > cutoff);
};

// Utility function to detect useEffect dependency issues
window.detectDependencyIssues = function () {
    const recentLogs = window.getRecentRenders(30);
    const guiRenders = recentLogs.filter(
        (log) => log.component === "GUIComponent"
    );

    console.group("🔍 DEPENDENCY ANALYSIS");

    if (guiRenders.length > 5) {
        console.warn(
            `⚠️ GUIComponent rendered ${guiRenders.length} times in the last 30 seconds`
        );
        console.log("This might indicate useEffect dependency issues");

        // Check for useEffect logs
        const useEffectLogs = recentLogs.filter((log) =>
            log.message.includes("useEffect")
        );

        if (useEffectLogs.length > 0) {
            console.group("🔄 Recent useEffect executions:");
            useEffectLogs.forEach((log) => {
                console.log(log.message, log.data);
            });
            console.groupEnd();
        }
    } else {
        console.log("✅ GUIComponent render frequency looks normal");
    }

    console.groupEnd();
};

// Auto-analysis every 30 seconds
let autoAnalysisInterval;
window.startAutoAnalysis = function () {
    if (autoAnalysisInterval) {
        clearInterval(autoAnalysisInterval);
    }

    autoAnalysisInterval = setInterval(() => {
        const suspiciousCount = window.renderTracker.suspiciousPatterns.length;
        if (suspiciousCount > 0) {
            console.warn(
                `🚨 AUTO-ANALYSIS: ${suspiciousCount} suspicious render patterns detected!`
            );
            window.analyzeRenders();
        }
    }, 30000);

    console.log("🤖 Auto-analysis started (runs every 30 seconds)");
};

window.stopAutoAnalysis = function () {
    if (autoAnalysisInterval) {
        clearInterval(autoAnalysisInterval);
        autoAnalysisInterval = null;
        console.log("🛑 Auto-analysis stopped");
    }
};

// Initialize
console.log("🚀 Render Analysis Debug Script Loaded!");
console.log("Available functions:");
console.log("  - analyzeRenders() - Show detailed analysis");
console.log("  - clearRenderTracking() - Clear tracking data");
console.log(
    "  - getRendersByComponent(name) - Get renders for specific component"
);
console.log("  - getRecentRenders(seconds) - Get recent renders");
console.log("  - detectDependencyIssues() - Check for useEffect issues");
console.log("  - startAutoAnalysis() - Start automatic monitoring");
console.log("  - stopAutoAnalysis() - Stop automatic monitoring");
console.log("");
console.log(
    "💡 Tip: Use the application normally, then call analyzeRenders() to see the results"
);
