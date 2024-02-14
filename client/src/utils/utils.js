//client\src\utils\utils.js

export const calculateGroupSize = (totalVerbs, minSize = 5, maxSize = 9) => {
    if (totalVerbs <= maxSize) return totalVerbs; // If total is within max, keep as one group

    let groupSize = Math.ceil(totalVerbs / Math.ceil(totalVerbs / maxSize));

    // Adjust if group size is smaller than minSize
    if (groupSize < minSize) {
        groupSize = minSize;
    }

    return groupSize;
};
