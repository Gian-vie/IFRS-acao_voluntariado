const ProtectedController = require("../controllers/protected.controller");
const VoluntariosModel = require("../models/voluntariosModel");
const VoluntariosService = require("../services/voluntarioService");
const EventosService = require("../services/eventosService");

jest.mock("../models/voluntariosModel");
jest.mock("../services/voluntarioService");
jest.mock("../services/eventosService");

describe("ProtectedController", () => {
  let res;
  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("dashboard: retorna 200 com mensagem contendo email", () => {
    const req = { user: { email: "user@example.com" } };
    ProtectedController.dashboard(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(req.user.email),
      })
    );
  });

  test("dashboard: retorna 500 em erro inesperado", () => {
    const req = {}; // req.user undefined -> causa erro
    ProtectedController.dashboard(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Erro ao acessar o painel",
        error: expect.any(String),
      })
    );
  });

  test("checkInscricao: retorna inscrito true quando existe inscrição", async () => {
    const req = { params: { id: "10" }, user: { id: 2 } };
    VoluntariosModel.findInscricao.mockResolvedValue({ id: 5 });
    await ProtectedController.checkInscricao(req, res);
    expect(VoluntariosModel.findInscricao).toHaveBeenCalledWith(2, "10");
    expect(res.json).toHaveBeenCalledWith({ inscrito: true });
  });

  test("checkInscricao: retorna inscrito false quando não existe inscrição", async () => {
    const req = { params: { id: "11" }, user: { id: 3 } };
    VoluntariosModel.findInscricao.mockResolvedValue(null);
    await ProtectedController.checkInscricao(req, res);
    expect(VoluntariosModel.findInscricao).toHaveBeenCalledWith(3, "11");
    expect(res.json).toHaveBeenCalledWith({ inscrito: false });
  });

  test("checkInscricao: retorna 400 em caso de erro", async () => {
    const req = { params: { id: "1" }, user: { id: 3 } };
    const err = new Error("DB error");
    VoluntariosModel.findInscricao.mockRejectedValue(err);
    await ProtectedController.checkInscricao(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  test("inscrever: retorna 201 e resultado em sucesso", async () => {
    const req = { params: { id: "20" }, user: { id: 4 } };
    const result = { id: 7, evento: 20, usuario: 4 };
    VoluntariosService.inscrever.mockResolvedValue(result);
    await ProtectedController.inscrever(req, res);
    expect(VoluntariosService.inscrever).toHaveBeenCalledWith(4, "20");
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  test("inscrever: retorna 400 em erro", async () => {
    const req = { params: { id: "21" }, user: { id: 5 } };
    const err = new Error("Já inscrito");
    VoluntariosService.inscrever.mockRejectedValue(err);
    await ProtectedController.inscrever(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });

  test("adminOnly: retorna 200 com mensagem contendo email", () => {
    const req = { user: { email: "admin@example.com" } };
    ProtectedController.adminOnly(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(req.user.email),
      })
    );
  });

  test("adminOnly: retorna 500 em erro inesperado", () => {
    const req = {}; // sem user -> erro
    ProtectedController.adminOnly(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Erro ao acessar a área admin",
        error: expect.any(String),
      })
    );
  });

  test("registerEvent: retorna 201 e resultado em sucesso", async () => {
    const req = { body: { titulo: "Evento A" } };
    const result = { id: 100, titulo: "Evento A" };
    EventosService.registerEvent.mockResolvedValue(result);
    await ProtectedController.registerEvent(req, res);
    expect(EventosService.registerEvent).toHaveBeenCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(result);
  });

  test("registerEvent: retorna 409 em conflito/erro", async () => {
    const req = { body: { titulo: "Evento B" } };
    const err = new Error("Evento já existe");
    EventosService.registerEvent.mockRejectedValue(err);
    await ProtectedController.registerEvent(req, res);
    expect(res.status).toHaveBeenCalledWith(409);
    expect(res.json).toHaveBeenCalledWith({ message: err.message });
  });
});