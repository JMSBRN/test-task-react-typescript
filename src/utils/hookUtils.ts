export const createTagsArrFromInput =(text: string) => {
    const tagsArr: string[] = [];
    const rgx = /#(\w+)/g;
    const matchedArr = text.match(rgx) as string[];
    if (matchedArr) {
      matchedArr.forEach((tag) => {
        const formattedTag = tag.slice(1);
        if (!tagsArr.includes(formattedTag)) {
          tagsArr.push(formattedTag);
        }
      });
    }
    return tagsArr;
};