# IS4100
## Installation Instructions
1.  Clone this repository
    ```
    git clone https://github.com/yuannypants/IS4100.git
    ```
2. Install dependencies
    ```
    npm install
    ```
3. Start the server
    ```
    npm run start
    ```
### Creating a new page
1.  Create a new <name>.js file with <name> being whatever meaningful name you want under '/client/components'
2.  Copy and paste the contents from Home.js into this new <name>.js file
3.  Edit the class name to be <name>
4.  Add a menu item inside '/client/contains/index.js' in createMenu() (copy and paste the block of code starting with this.menu.push(...) and modify the object being pushed. 'window.location' basically sets the url.)
5.  Inside '/client/routers/index.js', import the new js file you just created and add a corresponding <AuthenticatedRoute> tag with 'path' being the link you want to associate with the component, and 'component' being the component you have just created
6.  When you are done with 1-5, navigate to 'localhost:3000/<URL>' in your browser to see if it works. Then start developing whatever html content or wtv you want inside the return function under render().
7.  When you are done, refresh the page to view the changes made.
