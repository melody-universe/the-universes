import {
  index,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx"),
  ...prefix("/admin", [
    route("/new-instance", "./routes/admin/new-instance.tsx"),
  ]),
  ...prefix("/auth", [route("/login", "./routes/auth/login.tsx")]),
] satisfies RouteConfig;
