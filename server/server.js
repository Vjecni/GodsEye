// Import necessary modules
const express = require("express");
const cors = require("cors");
const fetch = (...args) =>
import("node-fetch").then(({ default: fetch }) => fetch(...args));
const path = require("path");
const multer = require("multer");
const Minio = require("minio");
const fs = require("fs");

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "*", // Adjust this to match your React app's origin
  credentials: true,
};

// Body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  console.log(`Request Received\nIP: ${req.ip}\nRequest URL: ${req.url}`);
  next();
});

// Multer middleware for handling file uploads

const upload = multer({ dest: "uploads/" });

// Configure MinIO client
const minioClient = new Minio.Client({
  endPoint: "mdev.j4f.org.uk",
  port: 443,
  useSSL: true,
  accessKey: "admin",
  secretKey: "j4fdevtesth0ll4",
});

// Route to handle API requests

// Api that fetches ban details
app.post("/api/ban", async (req, res) => {
	try {
		const userInput = req.query.banId;
		console.log(
			`Request received | Date: ${new Date()} | IP: ${
				req.socket.remoteAddress
			} | BanID: ${userInput}`
		);

		const response = await fetch(
			"https://faas.possumkorps.org/function/ban-lookup/",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({"banID": userInput}),
			}
		);
		// gets response as text ( I think )
		const responseBody = await response.text();
		// if api is fetched properly, It will return to console
		if (responseBody) {
			console.log(`API Data Feteched: ${true}`)
		}

		// does something with bucket
		const stream = await minioClient.listObjectsV2("devabuse", `${userInput}`, true, "");
		// empty array
		let flUrls = [];

		const streamPromise = new Promise((resolve, reject) => {
			// something
			stream.on("data", function (obj) {
				console.log(obj);

				// gets file nam and extension
				let fl = obj.name.split(".").join(".");
				//url for file preview
				let flUrl = `https://mdev.j4f.org.uk/devabuse/${fl}`

				// some debugging
				console.log(`${fl}\n${flUrl}`);
				//pushes url to blank url aeeay
				flUrls.push(flUrl)

				//responds with json
				//res.json(flUrl);
			});
			stream.on('error', function (err) {
				reject(err);
				console.log(err)
			})

			stream.on('end', function () {
				resolve(flUrls);
			})
		})

		try {
			flUrls = await streamPromise;
		} catch (err) {
			console.log(err);
		}

		const data = JSON.parse(responseBody);
		data.evidence_urls = flUrls;
		res.json(data);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({error: "Failed to fetch data"});
	}
});


app.post("/api/media", async (req, res) => {
  try {

    let input = req.query.banId

    console.log(
      `Request received | Date: ${new Date()} | IP: ${
        req.socket.remoteAddress
      } | BanID: ${input}`
    );

    const stream = minioClient.listObjectsV2("devabuse", `${input}`, true, "");



    // something
    stream.on("data", async (obj) => {
       const getUrl = () => {
        console.log(obj);

        // gets file nam and extension
        var fl = obj.name.split(".").join(".");
        //url for file preview
        var flUrl = `http://mdev.j4f.org.uk/devabuse/${fl}`
  
        // some debugging
        console.log(`${fl}\n${flUrl}`);
        //pushes url to blank url array
      }

    });
    stream.on('error', function (err) {
      console.log(err)
    })

    console.log(urlData)
    res.json(urlData)

  }
  catch(err) {
    console.log("Error fetching data:", err);
    res.status(500).json({ err: "Failed to fetch data" });
  }
})







// Route to handle video uploads
app.post("/api/upload", upload.single("video"), async (req, res) => {
  try {
    const file = req.file;
    const banId = req.body.banId;

    // Ensure file and banId are provided
    if (!file || !banId) {
      return res.status(400).json({ error: "Missing file or banId" });
    }

    // Extract original file extension
    const originalFilename = file.originalname;
    const fileExtension = originalFilename.split(".").pop();

    // Generate a new filename with the ban ID and original file extension appended
    const newFilename = `${banId}.${fileExtension}`;
    const newPath = `uploads/${newFilename}`;

    // Delete any existing file with the same name
    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }

    // Rename the uploaded file
    fs.renameSync(file.path, newPath);

    // Upload the renamed file to MinIO bucket
    await minioClient.fPutObject("devabuse", newFilename, newPath);

    // Delete the temporary file
    fs.unlinkSync(newPath);

    // Construct the file URL in MinIO
    const fileUrl = `http://mdev.j4f.org.uk/${newFilename}`;

    res.status(200).json({ success: true, fileUrl });
  } catch (error) {
    console.error("Error uploading video:", error);
    res.status(500).json({ error: error.message || "Failed to upload video" });
  }
});

// Serve static files from client/dist
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is alive on port: ${PORT}`);
});
