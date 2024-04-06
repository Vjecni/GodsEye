# Instructions for building & deploying

1.) Navigate to ` /server `, open terminal and run ` npm init -y && npm install ` (do same process for ` /client `)

2. Navigate back to ` /server ` (assuming that your current directory is ` /client `) , and run ` nodemon server.js ` to run app backend in developmnet "version", after that, navigate back to ` /client ` and run ` npm run dev `.

3. To Build project, all yoi have to do is to navigate to ` /client ` dir and execute ` npm run build ` inside terminal.

4. DEPLOYING: To deploy this app, I recommend some hosting that actually lets you to run 2 instances at same time, One is for backend, and the other one is for frontend, because, logically, backend wont work without frontend, and vice versa. Now, actual way of deployment depends of the hosting provider that you will use for example AWS, GC, Vercel (not recommended for backend apps).

WARNING: Do not run project using nodemon on production for security reasons **(some type of attacks can be done since if error happens, or code on backend is changed, nodemon will restart the server)**.
