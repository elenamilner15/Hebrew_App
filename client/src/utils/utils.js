//client\src\utils\utils2.js

export const calculateGroupSize = (totalVerbs, minSize = 4, maxSize = 5) => {
    if (totalVerbs <= maxSize) return totalVerbs; // If total is within max, keep as one group

    let groupSize = Math.ceil(totalVerbs / Math.ceil(totalVerbs / maxSize));

    // Adjust if group size is smaller than minSize
    if (groupSize < minSize) {
        groupSize = minSize;
    }

    return groupSize;
};



export const calculateGroupSize2 = (totalVerbs, minSize = 3, maxSize = 4) => {
    if (totalVerbs <= maxSize) return totalVerbs; // If total is within max, keep as one group

    let groupSize2 = Math.ceil(totalVerbs / Math.ceil(totalVerbs / maxSize));

    // Adjust if group size is smaller than minSize
    if (groupSize2 < minSize) {
        groupSize2 = minSize;
    }

    return groupSize2;
};
