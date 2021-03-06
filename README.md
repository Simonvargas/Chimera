<p align='center'>
  <img src='./react-app/src/assets/images/logo.png' height='200px'>
</p>

# Chimeras
Chimera is a platform that allows people to raise money for events ranging from life events such as celebrations and graduations to challenging circumstances like accidents and illnesses.. It is a fullstack React App made with a Redux state manager and a backend using Python, Flask, SQL-Alchemy, and PostgresSQL and any other technologies. 

* View the <a href='https://chimeras-app.herokuapp.com/'>Chimeras</a> App Live

* Reference to the Chimera <a href='https://www.github.com/{Simonvargas}/{chimera}/wiki'>Wiki Docs</a>

| Table of Contents |
| ----------------- |
| 1. [Features](#features) |
| 2. [Installation](#installation) |
| 3. [Technical Implementation Details](#technical-implementation-details) |
| 4. [Future Features](#future-features) |
| 5. [Contact](#contact) |
| 6. [Special Thanks](#special-thanks) |


## Technologies
* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"><img src="https://img.shields.io/badge/-JavaScript-F7DF1E?logo=JavaScript&logoColor=333333" /></a>
* <a href="https://www.postgresql.org/"><img src="https://img.shields.io/badge/-PostgreSQL-336791?logo=PostgreSQL&logoColor=white" /></a>
* <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white"></a>
* <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/react-%2320232a.svg?style=flat&logo=react&logoColor=%2361DAFB"></a>
* <a href="https://redux.js.org/"><img src="https://img.shields.io/badge/redux-%23593d88.svg?style=flat&logo=redux&logoColor=white"></a>
* <a href="https://developer.mozilla.org/en-US/docs/Web/CSS"><img src="https://img.shields.io/badge/-CSS3-1572B6?logo=CSS3" /></a>
* <a href="https://www.python.org/"><img src="https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white" /></a>
* <a href="https://flask.palletsprojects.com/"><img src="https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white" /></a>
* <a href="https://www.heroku.com/home"><img src="https://img.shields.io/badge/Heroku-430098?style=flat&logo=heroku&logoColor=white" /></a>


## Features

### Sign In and Sign Up
![Sign Up](./readme-assets/images/sign.jpg)
![Login](./readme-assets/images/login.jpg)

### Feed Page
Chimera feed displays all projects and situations people need aid for.
Discover and search for new projects to help build
![Feed Page](./readme-assets/images/feed.jpg)

### View Projects
Be able to view specific projects and its details
![Project Page](./readme-assets/images/project.jpg)

### Add Projects
Add a new Projects to the database
![Add Project](./readme-assets/images/project-add.jpg)

### Update & Delete Projects
On a specific project page, if you own the project, you are able to update your project details or delete the project.
![update a project](./readme-assets/images/updateProject.jpg)

### Support a Project
You can give to support to project by hitting the support button, specifying an amount and leaving an optional comment. 
![Project](./readme-assets/images/support.jpg)

### View your support
Donations and comments will populate in the backers & donations section in the project page
![Donations & Comments](./readme-assets/images/comments.jpg)

## Edit and Delete your support
In the backers & donations section, one can hit either the trash can icon to delete support or edit to update the comment posted.
![Donations & Comments](./readme-assets/images/edit&delete.jpg)


## Installation
To build/run project locally, please follow these steps:

1. Clone this repository

```shell
git clone https://github.com/Simonvargas/chimera.git
```

2. Install Pipfile dependencies and create the virtual environment
```shell
pipenv install
```

2. Install npm dependencies for the `/react-app`

```shell
cd react-app
npm install
```

3. In the `/` root directory, create a `.env` based on the `.env.example` with proper settings

4. Setup your PostgreSQL user, password and database and ensure it matches your `.env` file

5. Before running any flask commands, confirm you are in the pipenv virtual env. If not, run the command:
```shell
pipenv shell
```

5. In the root folder, create the database by running in the terminal:
```shell
flask db create
```

6. In the root folder, migrate tables to the database by running in the terminal:
```shell
flask db migrate
```

7. In the root folder, seed the database by running in the terminal:
```shell
flask seed all
```

8. Start the flask backend in the `/` root directory
```shell
flask run
```

9. Start the frontend in the `/react-app` directory

```javascript
npm start
```


## Technical Implementation Details

### Update

Put is working by information being sent over through our store and updating our tables with the associated ID that has been sent over.

```python
@project_routes.route('/edit/<int:id>', methods=['PUT'])
@login_required
def update_project(id):
    res = Project.query.get(id)
    form = ProjectForm()

    res.user_id = form.data['user_id']
    res.category_id = form.data['category_id']
    res.name = form.data['name']
    res.image = form.data['image']
    res.details = form.data['details']
    res.funding_goal = form.data['funding_goal']
    db.session.commit()
    return res.to_dict())
```

## Posting Donations

The donation post also updates the project funding amount which will automatically update the progress bar to reflect the change in the added amount

```javascript
 async function post(e){
        e.preventDefault()
        const updateAmount = Number(project.funding_raised) + Number(amount)
        const updateBackers = Number(project.backers + 1)
        const data = []
        if (amount < 1 || amount.toString()[0] == 0) {
          data.push('Your donation must be at least 1 one dollar')
        } 
        if (hostId === project.user_id) {
          data.push('You cannot donate to your own cause')
        }
        setErrors(data)
        
        if (data.length === 0) {
        await dispatch(backingActions.createBacking(hostId, id, amount, comment))
        await dispatch(projectActions.editProjectFunding(updateAmount, updateBackers, id))
        if (toggle) {
          setToggle(false)
        } else {
          setToggle(true)
        }
        setShowForm2(false)
      }
    }
```

## Future Features

1. __Search__ - search through a search bar will be implemented in order to provide a more user friendly experience

2. __Second Feature__ - A like feature will be added to each project.


## Contact

### Simon Vargas
<a href="https://www.linkedin.com/in/simon-vargas-aa0b6a14b/"><img src="./readme-assets/logos/linkedin-logo.png" height="28" align="middle" /></a>
<a href="https://angel.co/u/simon-vargas"><img src="./readme-assets/logos/angellist-logo.png" height="28" align="middle" /></a>
<a href="https://github.com/Simonvargas"><img src="./readme-assets/logos/github-logo.png" height="38" align="middle" /></a>

simonvargas01@gmail.com


## Special Thanks
* Fellow peers who have given me support and community: [Andrew](https://github.com/andru17urdna), [Henry](https://github.com/hnrywltn), [Pierre](https://github.com/TheGuilbotine), [Lema](https://github.com/lemlooma), [Meagan](https://github.com/meagan13), [Michelle](https://github.com/michellekontoff), [Nico](https://github.com/nicopierson), [John](https://github.com/Jomix-13), [Manna](https://github.com/makon57), and [Monte](https://github.com/theflaggship)
* Mentors who have given me their time and effort: [Zach](https://github.com/zdwatts), [Olivia](https://github.com/OByrnes), [Ed](https://github.com/edherm), and [Javier](https://github.com/javiermortiz) 
