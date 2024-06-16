How To Use Playwright

## TO OPEN

npx playwright open

## TO TEST

npx playwright test e2e.spec.ts

## USEFUL COMMANDS

--headed
allows you to watch the automation in the browser

--PWDEBUG=1
playwright debug = on. use this to manually step through tests

--project="chromium"
only run with one browser type

--workers=1
sets the amount of workers. use this in combo with 'headed' to not blow up your computer
