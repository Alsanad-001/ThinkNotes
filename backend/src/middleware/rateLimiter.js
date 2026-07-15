import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

let ratelimit;
const getRatelimit = () => {
  if (!ratelimit) {
    ratelimit = new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(20, "60 s"),
    });
  }
  return ratelimit;
};

export const rateLimiter = async (req, res, next) => {
  try {
    const { success } = await getRatelimit().limit("api-limit");
    if (!success) {
      return res.status(429).json({ message: "Too many requests, please try again later." });
    }
    next();
  } catch (error) {
    console.error("Rate limiter error:", error);
    next(); // fail open so a Redis outage doesn't take down the API
  }
};