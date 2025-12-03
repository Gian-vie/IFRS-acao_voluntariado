const PublicController = require("../controllers/public.controller");
const EventosModel = require("../models/eventosModel");

jest.mock("../models/eventosModel");

describe("PublicController", () => {
  let res;
  beforeEach(() => {
    jest.clearAllMocks();
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
  });

  test("home: retorna 200 e mensagem de boas-vindas", () => {
    const req = {};
    PublicController.home(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.send).toHaveBeenCalledWith("Bem-vindo à API pública!");
  });

  test("eventList: retorna lista formatada de eventos", async () => {
    const eventos = [
      {
        id: 1,
        titulo: "Evento 1",
        data: "2025-12-05T00:00:00.000Z",
        hora: "14:30:00",
      },
      {
        id: 2,
        titulo: "Evento 2",
        data: "2025-01-10T00:00:00.000Z",
        hora: "09:00:00",
      },
    ];
    EventosModel.findAll.mockResolvedValue(eventos);

    const req = {};
    await PublicController.eventList(req, res);

    expect(EventosModel.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);

    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 1,
        titulo: "Evento 1",
        data: "05/12/2025",
        hora: "14:30",
      }),
      expect.objectContaining({
        id: 2,
        titulo: "Evento 2",
        data: "10/01/2025",
        hora: "09:00",
      }),
    ]);
  });

  test("eventList: retorna array vazio quando não há eventos", async () => {
    EventosModel.findAll.mockResolvedValue([]);
    const req = {};
    await PublicController.eventList(req, res);
    expect(EventosModel.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test("eventList: retorna 500 em caso de erro", async () => {
    const err = new Error("DB failure");
    EventosModel.findAll.mockRejectedValue(err);
    const req = {};
    await PublicController.eventList(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Erro ao carregar a lista de eventos",
        error: err.message,
      })
    );
  });

  test("eventListByID: retorna evento formatado quando encontrado", async () => {
    const evento = {
      id: 10,
      titulo: "Evento X",
      data: "2025-03-15T00:00:00.000Z",
      hora: "18:45:00",
    };
    EventosModel.findById.mockResolvedValue(evento);
    const req = { params: { id: "10" } };
    await PublicController.eventListByID(req, res);
    expect(EventosModel.findById).toHaveBeenCalledWith("10");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([
      expect.objectContaining({
        id: 10,
        titulo: "Evento X",
        data: "15/03/2025",
        hora: "18:45",
      }),
    ]);
  });

  test("eventListByID: retorna array vazio quando não encontrado", async () => {
    EventosModel.findById.mockResolvedValue(null);
    const req = { params: { id: "999" } };
    await PublicController.eventListByID(req, res);
    expect(EventosModel.findById).toHaveBeenCalledWith("999");
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith([]);
  });

  test("eventListByID: retorna 500 em caso de erro", async () => {
    const err = new Error("DB fail");
    EventosModel.findById.mockRejectedValue(err);
    const req = { params: { id: "1" } };
    await PublicController.eventListByID(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Erro ao carregar a lista de eventos",
        error: err.message,
      })
    );
  });
});
