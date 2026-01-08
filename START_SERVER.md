# How to Start the Instagram Stats Wrapper

## Important: Development vs Production

### For Development (Recommended):
```bash
npm run dev
```
- Starts the development server with hot reload
- Access at: http://localhost:3000
- Automatically rebuilds when you change code
- Shows detailed error messages

### For Production:
```bash
npm run build
npm start
```
- First builds the production version
- Then starts the production server
- Faster but no hot reload
- Requires build step first

## Troubleshooting

### Port 3000 Already in Use
If you get "port 3000 already in use":
1. Find the process: `netstat -ano | findstr ":3000"`
2. Kill it: `Stop-Process -Id <PID> -Force`
3. Or use a different port: `npm run dev -- -p 3001`

### Server Not Starting
1. Make sure dependencies are installed: `npm install`
2. Check for errors in the terminal
3. Try deleting `.next` folder and rebuilding: `Remove-Item -Recurse -Force .next; npm run dev`

### Chrome vs Cursor Browser Issue
The Instagram OAuth redirect URI must match exactly:
- Check your `.env.local` or `.env` file
- Make sure `NEXT_PUBLIC_REDIRECT_URI` matches your current URL
- In Meta Developer Console, add the exact redirect URI: `http://localhost:3000/auth/callback`

## Environment Variables Needed

Create a `.env.local` file in the root directory:
```
NEXT_PUBLIC_INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000/auth/callback
```

## Quick Start
1. Install dependencies: `npm install`
2. Set up environment variables (see above)
3. Start dev server: `npm run dev`
4. Open browser: http://localhost:3000 

