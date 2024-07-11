<h1 style="text-align: center;">RedListVote 📉</h1>

<p style="text-align: center;">📥 Vote for your favorite endangered animal! 🦥</p>

Did you know there are over 10,500 critically endangered species? There are so many animals that are close to being wiped off the face of the planet. To bring awareness to this issue RedListVote presents a random set of endangered animals for a daily poll! The most voted animals make their way to the leaderboard. It's a fun and interactive way to learn about endangered animals!

## How to setup development

```bash
# install dependencies
npm i

# run dev server
npm run dev
```

### Setting up PocketBase

RedListVote requires a PocketBase instance to store and retrieve species data. <br/>
You can download a PocketBase server from their [documentation](https://pocketbase.io/docs/).
Then run the serve command with the executable. Generate specie data at the /console path

### Environment Variables
.env file
```env
generate = a password for the console
IUCN_token = from the IUCN API
PUBLIC_POCKETBASE_URL = http://127.0.0.1:8090 where your pocketbase instance is located
```

## Building

RedListVote can either be built as a standalone Node server or a Docker container.

**Docker:**
Build an image using the provided Dockerfile

**_To preview build:_**

```bash
# Build the project to the build directory
npm run build

# Preview built project with simple server
npm run preview
```
