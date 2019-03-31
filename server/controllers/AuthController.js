export function register(req, res) {
  res.json({
    data: "ok",
  })
}

export function login(req, res) {
  res.json({
    username: "User",
    nickname: "John Smith",
  })
}