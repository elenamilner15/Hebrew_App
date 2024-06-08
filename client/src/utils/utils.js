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



// export const calculateGroupSize2 = (totalVerbs, minSize = 3, preferredSize = 4, maxSize = 5) => {
//     // If total number of verbs is less than the max, return total number of verbs as group size
//     if (totalVerbs <= maxSize) return totalVerbs;

//     // Start with the preferred group size
//     // Calculate the initial number of groups as the ceiling of total verbs divided by the preferred size.
//     let numberOfGroups = Math.floor(totalVerbs / preferredSize);
//     let groupSize = Math.floor(totalVerbs / numberOfGroups);
//     let remainder = totalVerbs % numberOfGroups;

//     // If last group is smaller than the minimum size, try to redistribute
//     if (remainder > 0 && remainder < minSize) {
//         // If redistribution results in groups that are too large, decrease group size
//         while (groupSize > maxSize || (remainder > 0 && remainder < minSize)) {
//             numberOfGroups++;
//             groupSize = Math.floor(totalVerbs / numberOfGroups);
//             remainder = totalVerbs % numberOfGroups;
//             if (groupSize === minSize) break; // Break if we reach minimum size to avoid endless loop
//         }
//     }

//     // After trying to use preferred size and redistribution, use min size if needed
//     if (groupSize < minSize) {
//         numberOfGroups = Math.ceil(totalVerbs / minSize);
//         groupSize = Math.floor(totalVerbs / numberOfGroups);
//         remainder = totalVerbs % numberOfGroups;

//         // Ensure we don't end up with a last group smaller than minSize
//         if (remainder > 0 && remainder < minSize) {
//             numberOfGroups--;
//             groupSize = Math.floor(totalVerbs / numberOfGroups);
//         }
//     }

//     return groupSize;
// };

export const calculateGroupSize2 = (totalVerbs, minSize = 3, preferredSize = 4, maxSize = 5) => {
    // If total number of verbs is less than the max, return total number of verbs as group size
    if (totalVerbs <= maxSize) return totalVerbs;
    console.log("total verbs:", totalVerbs);
    // Start with the preferred group size

    let numberOfGroups = Math.floor(totalVerbs / preferredSize);
    let groupSize = Math.floor(totalVerbs / numberOfGroups);
    let remainder = totalVerbs % numberOfGroups;
    console.log("numberOfGroups:", numberOfGroups);
    console.log("groupSize:", groupSize);
    console.log("remainder:", remainder);
    // Log the remainder if it's less than minSize and greater than 0
    if (remainder > 0 && remainder < minSize) {
        console.log("Remainder before redistribution:", remainder);
    }

    // Redistribute the remainder across the groups
    if (remainder > 0) {
        let groupsWithExtra = remainder; // the number of groups that will receive one extra verb
        while (remainder > 0) {
            for (let i = 0; i < numberOfGroups; i++) {
                if (remainder == 0) break;
                if (groupSize + 1 <= maxSize) {  // Only add if it does not exceed the max size
                    groupSize++;   // Add one to the group size
                    console.log("groupSize:", groupSize);
                    remainder--;   // Reduce the remainder
                    console.log("groupSize:", groupSize);
                }
            }
        }
        console.log("Groups with an extra verb:", groupsWithExtra);
    }

    // Check if the final groupSize is within allowed limits
    if (groupSize > maxSize || groupSize < minSize) {
        // Recalculate with the minimum size if redistribution violates size constraints
        numberOfGroups = Math.ceil(totalVerbs / minSize);
        groupSize = Math.floor(totalVerbs / numberOfGroups);
    }

    return groupSize;
};

