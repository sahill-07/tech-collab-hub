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

  getCurrentColElement(array, currcol, totalcolumns) {
    let res = [];
    let currind = currcol;
    let noOfRows =
      Math.floor(array.length / totalcolumns) +
      (array.length % totalcolumns > currcol );
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

  getFilters(projectlist) {
    let res = [];
    // Check if projectlist is an object
    if (typeof projectlist === "object" && projectlist !== null) {
      // Iterate over properties of the object
      Object.values(projectlist).forEach((proj) => {
        // Check if proj is an object with languages and topic properties
        if (typeof proj === "object" && proj !== null) {
          if (proj.languages !== null && Array.isArray(proj.languages)) {
            res.push(...proj.languages);
          }
          if (proj.topic !== null && Array.isArray(proj.topic)) {
            res.push(...proj.topic);
          }
        }
      });
    }

    // Remove duplicates
    res = [...new Set(res)];
    return res;
  }

  filterProjectList(projects, selectedOptions){
    if(selectedOptions.length > 0){
      const filteredProjects = projects.filter(project =>
        selectedOptions.every(item =>
          project.topic?.includes(item) || project.languages.includes(item)
        )
      );
      return filteredProjects
    }else
      return projects
  }
}

export default new BasicUtilsFunction();
