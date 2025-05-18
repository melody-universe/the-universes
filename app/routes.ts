import {
  index,
  layout,
  prefix,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./routes/layout.tsx", [
    index("./routes/home.tsx"),
    ...prefix("/admin", [
      index("./routes/admin/admin.tsx"),
      route("/new-instance", "./routes/admin/new-instance.tsx"),
      route("/reset-instance", "./routes/admin/reset-instance.ts"),
    ]),
    ...prefix("/auth", [
      index("./routes/auth/auth.tsx"),
      route("/logout", "./routes/auth/logout.ts"),
    ]),
  ]),
] satisfies RouteConfig;
