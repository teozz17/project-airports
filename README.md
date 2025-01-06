# project-airports
World Travel, Inc. Technical Interview

# Airport Atlas

## Overview:
An application to store airports worldwide, some visited and others yet to visit. Have a unique story or anecdote that happened to you at an airport? Add notes to keep a record of your flight stories. Add places and start your journey.

## Documentation
### Database:
Tools:
Use PostgreSQL as requested, creating 2 tables, one for users and another for airports to be added. Later in the deployment section, I will show how it was uploaded to AWS. For now, let’s talk about it locally. You need to have PostgreSQL installed on your machine, and within the `settings.py` file of the backend, add the required details.

## Backend and Tests:

For the backend, Python was requested to be used. I utilized the Django framework due to my familiarity with it. Given the simplicity of this small presentation project and limited time availability, I opted for a very monolithic architecture where the `views.py` file handles everything from the API to database queries. This approach was chosen due to the simplicity of the project and limited time. Ideally, for such projects, it would be best to have each layer clearly separated, leading to a 4-layer architecture: model, logic, data access, and API itself.  
Improvements:  
Therefore, the backend implementation can be improved by almost 100%, but this was not required for this instance. It currently serves its purpose.

### Tests:  
To test the application, navigate to the project directory and run the command:  
`python manage.py test`

Only the backend contains tests as the frontend changes frequently, and there was limited time. In the long term, tests could be implemented for all projects.

## Frontend:

Tools:  
For the frontend, React was requested. To create a more fluid development process, I used Vite, which does not pose any constraints for this type of project. Given the limited time, I opted to use Bootstrap for styling purposes. Using pure CSS wasn’t necessary, and another viable option I considered was Tailwind, but I chose the simplicity of Bootstrap.  
What was done:  
A SPA-style page was created, including routes for the required functionalities: read, create, edit, and delete objects—in this case, airports.  
States:  
For state management, I provided flexibility to use either Redux or React Context. In my case, I chose Redux due to my familiarity, but for such small projects, React Context is more than sufficient. Considering that Redux is becoming less popular globally.  
State management is straightforward: an API call fetches all airports and stores them in Redux’s store, from which they are added, removed, or edited.

Improvements:  
The frontend has many improvements to be made, like better styling, error messages when object creation fails. For example, I only show that the name and ICAO are required, but don’t present them efficiently in the UI. Additionally, the login does not expose any errors if login fails. It does not notify the user of any issues, which was noticed after the app was deployed on AWS. For login/logout, the page needs to be reloaded to clear Redux states, which is entirely improvable.

## Bugs:  
When editing airports, if the same airport is edited multiple times, the 'visited' state resets to false, which was noted after testing on AWS.

## AWS:
As requested, I deployed the application on AWS, taking into account the 6 pillars. Below, I briefly explain each pillar and how it was implemented.  
### RDS – PostgreSQL  
### EC2-Django Backend  
### S3-React Frontend  
1. **Operational Excellence**  
The architecture uses managed services like RDS for the database and EC2 for the Django backend, facilitating system operation and maintenance.  
A CI/CD pipeline for automation was omitted.

2. **Security**  
Using services like RDS and EC2 allows for managing permissions and access controls through IAM (Identity and Access Management). The database is encrypted at rest and in transit, and traffic between services is protected using VPCs, security groups, and restrictive policies.

3. **Reliability**  
The configuration includes RDS with multi-AZ to ensure high availability and fault tolerance. EC2 can also be configured with automated replication or horizontal scaling to handle traffic increases without interruptions. Using managed services helps reduce downtime risks.

4. **Performance Efficiency**  
The deployed React frontend on S3 ensures efficient and fast content delivery to users, optimizing loading times. Additionally, EC2 services allow resource adjustments according to demand, achieving efficient resource distribution.

5. **Cost Optimization**  
Using RDS and EC2 with scalability allows cost optimization based on real load. AWS also offers reserved instances or on-demand instances, reducing unnecessary costs. The frontend on S3 provides low-cost storage and static content distribution.

6. **Sustainability**  
AWS provides sustainable practices, such as using EC2 instances on-demand and RDS with optimized energy efficiency options. Additionally, the chosen region positively impacts reducing the carbon footprint.

The configuration with RDS for PostgreSQL database, EC2 for Django backend, and S3 for React frontend adheres to these 6 pillars by providing a scalable, secure, reliable, and cost-efficient architecture, optimizing system performance and sustainability.

## How to Test:
Install PostgreSQL on your machine.  
Clone the repository, and run two terminals: one for the backend server and another for the frontend.  
For the backend, navigate to the `back_project` folder and install all dependencies from `requirements.txt` using the command:  
`pip install -r requirements.txt`  
Then run the following commands to create migrations and apply tables:  

- `python manage.py makemigrations`  
- `python manage.py migrate`

Once completed, start the server with:  
`python manage.py runserver`  

This will allow you to connect to the frontend, which has a default URL on port 8000. If your port differs, change it accordingly.

To start the frontend, run the following command within the `front-project` folder:  
`npm install`  

After installation, start the development server with:  
`npm run dev`

This will be sufficient to access the entire application.
