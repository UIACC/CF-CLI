#!/usr/bin/env node

// Main Packages needed for the application
const program = require('commander');
const functions = require('./functions')

function tagsDistribution (handle){
    var accepted_Tags = [];
    var tagsDictionary = {
        'implementation' : 0,
        'dp' : 0,
        'math' : 0,
        'greedy' : 0,
        'brute force' : 0,
        'data structures' : 0,
        'constructive algorithms' : 0,
        'dfs' : 0,
        'sortings' : 0,
        'binary search' : 0,
        'graphs' : 0,
        'trees' : 0,
        'strings' : 0,
        'number theory' : 0,
        'geometry' : 0,
        'combinatorics' : 0,
        'two pointers' : 0,
        'dsu' : 0,
        'bitmasks' : 0,
        'probabilities' : 0,
        'shortest paths' : 0,
        'hashing' : 0,
        'divide and conquer' : 0,
        'games' : 0,
        'matrices' : 0,
        'flows' : 0,
        'string suffix structures' : 0,
        'expression parsing' : 0,
        'graph matchings' : 0,
        'ternary search' : 0,
        'meet-in-the-middle' : 0,
        'fft' : 0,
        '2-sat' : 0,
        'chinese remainder theorem' : 0,
        'schedules' : 0,
    };

    request('https://codeforces.com/api/user.status?handle=' + handle, function (error, response, body) {
        if (error) {
            console.error(error);
        } else {
            var result = JSON.parse(body);
            if (result.status == "FAILED") {
                console.log(result.comment);
            } else {
                result = result.result;
                for (i = 0; i < result.length; ++i) {
                    if (result[i].verdict == "OK") {
                        var tags= result[i].problem.tags;
                        accepted_Tags.push(tags);
                    }
                }
                for (i = 0; i < accepted_Tags.length; ++ i)
                {
                    for ( j = 0; j < accepted_Tags[i].length; ++j)
                    {
                        for (var key in tagsDictionary)
                        {
                            if (key == accepted_Tags[i][j]){
                                ++ tagsDictionary[key];
                            }
                        }
                    }
                }
                console.log () ;
                console.log("-----------------------------------------------------------------------------------------")
                for (i in tagsDictionary){
                    if (tagsDictionary[i] != 0)
                    {

                        process.stdout.write("[-] "+ i + " : "  );
                        for (var j = 0; j < (tagsDictionary[i] / accepted_Tags.length)*100; ++j)
                            process.stdout.write( '█');
                        console.log( "  " + ((tagsDictionary[i] / accepted_Tags.length)*100).toFixed(2) + " % ");
                        console.log("-----------------------------------------------------------------------------------------")
                    }
                }

            }
        }
    });
}



program
    .version('1.0.4', '-v, --version');

program.on('--help', () => {
    console.log('\n  All options:');
    console.log('    -u, --user                handle of the required user');
    console.log('    -c, --count               number of results required');
    console.log('    -t, --tag                 tag of the required problems');
    console.log('    -d, --difficulty          difficulty of the required problems');
    console.log('    -s, --submission          Submission ID of the requiered submission');
    console.log('    -i, --contest             contest ID of the requiered submission');
});


program
  .command('get-user')
  .option('-u, --user', 'handle of the required user')
  .action(function (usr) {
      if (typeof usr === "string")
          functions.getUserInfo(usr);
      else
          console.log("Invalid!!!!!!");
  });

program
  .command('get-code')
  .option('-s, --submission', 'submission id required')
  .option('-i, --contest', 'contest id required')
  .action(function (sub_id, con_id) {
      if (typeof sub_id === "string" && typeof con_id === "string")
          functions.getSubmissionCode(sub_id, con_id);
      else
          console.log("Invalid!!!!!!");
  });


program
  .command('get-stats')
  .option('-u, --user', 'handle of the required user')
  .action(function (usr) {
      if (typeof usr === "string")
          functions.getContestStatistics(usr);
      else
          console.log("Invalid!!!!!!");
  });

program
  .command('get-submissions')
  .option('-u, --user', 'handle of the required user')
  .option('-c, --count', 'number of problems to be generated')
  .action(function (usr, cnt) {
    if (typeof usr === "string" && typeof cnt === "string")
    functions.getUserSubmissions(usr, cnt);
    else
    console.log("Invalid!!!!!!");
  });

program
  .command('get-contests')
  .option('-c, --count', 'max number of upcoming contest to print')
  .action(function (cnt) {
      if (typeof cnt === "string")
          functions.getUpcomingContests(cnt);
      else
          console.log("Invalid!!!!!!");
  });

program
  .command('get-blogs')
  .option('-c, --count', 'number of blogs to get')
  .action(function (cnt) {
      if (typeof cnt === "string")
          functions.getRecentActions(cnt);
      else
          console.log("Invalid!!!!!!");
  });




program
  .command('get-problems')
  .option('-u, --user', 'handle of the required user')
  .option('-c, --count', 'number of problems to be generated')
  .option('-t, --tag', 'category of the problem to be generated')
  .option('-d, --difficulty', 'difficulty of the required problems')
  .action(function (usr, cnt, tag, dif) {
      if (typeof usr === "string" && typeof cnt === "string" &&
          typeof tag === "string" && typeof dif === "string")
          functions.getProblems(usr, cnt, tag, dif);
      else
          console.log("Invalid!!!!!!");
  });



program
  .command('tag-distribution')
  .option('-u, --user', 'handle of the required user')
  .action(function (usr) {
      if (typeof usr === "string")
          tagsDistribution(usr);
      else
          console.log("Invalid!!!!!!");
  });

program.parse(process.argv);
