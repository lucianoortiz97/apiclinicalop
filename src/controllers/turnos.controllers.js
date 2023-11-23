import { Medicos } from "../model/medicos.js";
import { Pacientes } from "../model/pacientes.js";
import { Turnos } from "../model/turnos.js";

const getTurno = async (req, res) => {
  const id = req.params.id;
  try {
    const getTurno = await Turnos.findByPk(id);
    getTurno
      ? res.json(getTurno)
      : res.json(`No se encontró el turno con el id ${id}`);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

const getTurnos = async (req, res) => {
  try {
    const turnos = await Turnos.findAll({
      include: [
        {
          model: Medicos,
          as: 'medico', // Este alias debe coincidir con el definido en el modelo de turnos
          attributes: ['nombre', 'apellido'],
        },
        {
          model: Pacientes,
          as: 'paciente', // Este alias debe coincidir con el definido en el modelo de turnos
          attributes: ['nombre', 'apellido'],
        },
      ],
    });

    res.json(turnos);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

const createTurnos = async (req, res) => {
  try {
    const { idPaciente, idMedico, fecha, hora, obraSocial, especialidad } = req.body;

    const nuevoTurno = await Turnos.create({
      idPaciente,
      idMedico,
      fecha,
      hora,
      obraSocial,
      especialidad,
    });

    res.send("Turno creado");
  } catch (error) {
    res.status(500).json({ error: "El turno no pudo crearse" });
  }
};

const updateTurnos = async (req, res) => {
  try {
    const { id } = req.params;
    const { idPaciente, idMedico, fecha, hora, obraSocial, especialidad } = req.body;

    await Turnos.update(
      {
        idPaciente,
        idMedico,
        fecha,
        hora,
        obraSocial,
        especialidad,
      },
      {
        where: { id },
      }
    );

    res.json(`Se modificó el turno ${id}`);
  } catch (error) {
    res.json(`No se encontró el turno con el id ${id}`);
  }
};

const deleteTurnos = async (req, res) => {
  const { id } = req.params;
  try {
    await Turnos.destroy({
      where: { id },
    });

    res.send(`El turno con el id ${id} ha sido eliminado`);
  } catch (error) {
    res.status(500).send(`Error del delete: ${error.message}`);
  }
};

export {
  getTurno,
  getTurnos,
  createTurnos,
  updateTurnos,
  deleteTurnos,
};
