const axios = require('axios');
const cheerio = require('cheerio');



class UserAnalytics {
    async fetchGitHubStats(username) {
        const url = `https://github-readme-stats.vercel.app/api?username=${username}`;
      
        try {
          const response = await axios.get(url);
          if (response.status === 200) {
            const html_response = response.data;
      
            const $ = cheerio.load(html_response);
      
            // Extract the content of the desc tag
            const desc_content = $('desc').text();
      
            // Extracting Total Stars Earned
            const start_earn = desc_content.split(',')[0].split(': ')[1].trim();
      
            // Extracting Total Commits
            const total_commits = desc_content.split(',')[1].split(': ')[1].trim();
      
            // Extracting Total PRs
            const total_prs = desc_content.split(',')[2].split(': ')[1].trim();
      
      
            return {
              total_commits: total_commits,
              total_pull_request: total_prs,
              star_earned: start_earn
            };
          }
        } catch (error) {
          console.error("Error fetching GitHub stats:", error);
          return {};
        }
      }
      
}


module.exports = new UserAnalytics();