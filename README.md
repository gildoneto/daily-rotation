# Task Rotation Tool

For the **Portuguese version** of this README, click [here](README-pt-BR.md).

[![GitHub](https://img.shields.io/badge/GitHub-Repository-blue)](https://github.com/gildoneto/daily-rotation)
[![GitHub Pages](https://img.shields.io/badge/GitHub-Pages-brightgreen)](https://gildoneto.github.io/daily-rotation/)


## Description

The **Name Distribution** project is a web application that allows you to add names and distribute daily tasks in a rotating manner, excluding specific days when each person is unavailable. The application generates a table with the distribution of names throughout the month, excluding Saturdays, Sundays, and Wednesdays.

## Features

- Add names individually or in bulk (comma-separated).
- Specify unavailable days for each name.
- Select the month and year for the distribution.
- Generate a table with the distribution of names throughout the month.

## Access the Project

You can access the online application through GitHub Pages: [Name Distribution](https://gildoneto.github.io/daily-rotation/)

## How to Use

1. Add names individually or in bulk.
2. Specify unavailable days for each name (optional).
3. Select the desired month and year.
4. Click "Generate Table" to generate the distribution table.

## Author

This project was created by [Gildo Neto](https://github.com/gildoneto).

## License

This project is licensed under the [MIT License](LICENSE).

## Useful tips to devs

- First implement new features on `main`branch
- Create a new tag and push

```shell
git tag -a v2.0 -m "Release version 2.0"
git push origin v2.0
```

- Go to `gh-pages` branch, merge with `main` and push to deploy

```shell
git checkout gh-pages
git merge main
git push
```

- Go to [releases](https://github.com/gildoneto/daily-rotation/releases) on github
- Click on `Draft a new release`
- Choose a release title
- Write the changes on Describe input
- Finally click on `Publish release`
