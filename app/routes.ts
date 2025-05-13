import { index, route, type RouteConfig } from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  route("/new-instance", "./routes/new-instance.tsx"),
] satisfies RouteConfig;
