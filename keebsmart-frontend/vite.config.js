import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import os from 'os';

// Function to get the local network IP address
function getNetworkIp() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
      for (const iface of interfaces[name]) {
          if (iface.family === 'IPv4' && !iface.internal) {
              return iface.address;
          }
      }
  }
}

const ip = getNetworkIp();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0' || ip,
    port: 5173,
  }
})
