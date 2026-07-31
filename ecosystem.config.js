/**
 * pm2 ecosystem for `links.andresmorales.com.co`.
 *
 * Replaces the previous `nohup ./start-allmylinks.sh` pattern, which left
 * orphan `sh -c next start` wrappers when the bash tool reaped its session
 * tree and blocked port 3002 on the next deploy. pm2 keeps a single
 * supervised instance, autorestarts on crash, and exposes `pm2 logs` /
 * `pm2 restart` for direct debugging.
 *
 * Usage:
 *   pm2 start ecosystem.config.js
 *   pm2 save                                  # persist across reboots
 *   pm2 restart links                         # redeploy (after git pull + build)
 *   pm2 logs links                            # tail both stdout and stderr
 *   pm2 delete links                          # stop + remove from pm2 list
 *
 * Boot autostart (optional — match the existing VPS conventions):
 *   pm2 startup                               # prints the systemd unit command
 *   # (run the printed `sudo env PATH=...` once)
 */
module.exports = {
  apps: [
    {
      name: 'links',
      cwd: '/home/telchar/links',
      script: '/home/telchar/links/node_modules/.bin/next',
      args: 'start -p 3002 -H 127.0.0.1',
      env: {
        NODE_ENV: 'production',
      },
      // Single-stream logging into /home/telchar/logs (same dir the rest
      // of the VPS uses); pm2 multiplexes time-stamped output.
      out_file: '/home/telchar/logs/links.out',
      error_file: '/home/telchar/logs/links.err',
      merge_logs: true,
      // autorestart covers unexpected exits; `max_memory_restart` is a
      // safety net for memory leaks (Next.js dev server has leaked before).
      autorestart: true,
      max_memory_restart: '300M',
      // Don't restart faster than every 5s, don't pile up more than 5
      // crash snapshots in the log.
      restart_delay: 5000,
      max_restarts: 5,
    },
  ],
};
