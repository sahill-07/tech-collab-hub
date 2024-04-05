class BasicUtilsFunction {
  formatGithubRepoName(repo_name) {
    // Split the string by '-'
    const parts = repo_name.split(/[-_]/);

    // Convert each part to title case
    const titleCaseParts = parts.map((part) => {
      return part.charAt(0).toUpperCase() + part.slice(1);
    });
    // Join the title-cased parts with space
    const titleCasedString = titleCaseParts.join(" ");
    return titleCasedString;
  }


  getCurrentColElement(array, currcol, totalcolumns){
    let res = [];
    let currind = currcol;
    let noOfRows =
        Math.floor(array.length / totalcolumns) + (array.length % totalcolumns > currcol + 1);
    for (let j = 0; j < noOfRows && currind < array.length; j++) {
      res.push(array[currind]);
      currind += totalcolumns;
    }
    return res;
  }

  getNumberOfColumns(width) {
    if (width >= 1280) {
      return 4; //xl
    } else if (width >= 1024) {
      return 3; // lg
    } else if (width >= 768) {
      return 2; //md
    } else {
      return 1; //sm
    }
  }
}

export default new BasicUtilsFunction();
