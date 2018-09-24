# climblogger

indoor rock climbing app
_____________________________________________

# development participation

## initial steps

1.
- on your desktop: install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- on your desktop: install [node.js](https://nodejs.org/en/). currently using `v8.11.3`
- on your desktop: install [ADB](https://developer.android.com/studio/command-line/adb.html)

        sudo apt-get install adb

- run the following commands from `command prompt` or `terminal`

        git clone https://github.com/tinysiren/Climbing-log.git
        cd Climbing-log
        npm install

2.
- in one terminal run

        rethinkdb

- in another terminal run

        npm run server

- in a third terminal with your mobile device connected via ADB, run

        npm run android (or `npm run ios`)

## update development copy after any latest [commit](https://github.com/tinysiren/Climbing-log/commits/master)

- open `command prompt` or `terminal` inside `~/Climbing-log` directory and enter the following:

        git pull
        npm install

- repeat step 2 above
