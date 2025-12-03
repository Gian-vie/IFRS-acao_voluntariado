// We recommend installing an extension to run jest tests.
const AuthController = require("../controllers/auth.controller");
const UserService = require("../services/userService");

jest.mock("../services/userService");

describe("AuthController", () => {
  let res;
  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("register: retorna 201 e resultado em sucesso", async () => {
    const mockResult = { id: 1, email: "test@example.com" };
    UserService.registerUser.mockResolvedValue(mockResult);

    const req = { body: { email: "test@example.com", password: "secret" } };
    await AuthController.register(req, res);

    expect(UserService.registerUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  test("register: retorna 409 com mensagem de erro em conflito", async () => {
    const err = new Error("Usuário já existe");
    UserService.registerUser.mockRejectedValue(err);

    const req = { body: { email: "exists@example.com", password: "secret" } };
    await AuthController.register(req, res);

    expect(UserService.registerUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  test("login: retorna 200 e token/usuário em sucesso", async () => {
    const mockResult = { token: "jwt-token", user: { id: 2, email: "u@ex.com" } };
    UserService.loginUser.mockResolvedValue(mockResult);

    const req = { body: { email: "u@ex.com", password: "pwd" } };
    await AuthController.login(req, res);

    expect(UserService.loginUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockResult);
  });

  test("login: retorna 401 se não for encontrado", async () => {
    const err = new Error("Usuário não encontrado");
    UserService.loginUser.mockRejectedValue(err);

    const req = { body: { email: "noone@ex.com", password: "pwd" } };
    await AuthController.login(req, res);

    expect(UserService.loginUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  test("login: returns 401 when password invalid", async () => {
    const err = new Error("Senha inválida");
    UserService.loginUser.mockRejectedValue(err);

    const req = { body: { email: "user@ex.com", password: "wrong" } };
    await AuthController.login(req, res);

    expect(UserService.loginUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  test("login: returns 500 on other errors", async () => {
    const err = new Error("Banco de dados indisponível");
    UserService.loginUser.mockRejectedValue(err);

    const req = { body: { email: "user@ex.com", password: "pwd" } };
    await AuthController.login(req, res);

    expect(UserService.loginUser).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});
