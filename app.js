const { BaseController } = require("./controllers/base_controller");
const { BaseRepository } = require("./repositories/base_repository");
const { BaseUsecase } = require("./usecases/base_usecase");

async function Server({ app, db }) {
    let repository = await BaseRepository({ db });
    let usecase = BaseUsecase({ repository });
    BaseController({ app, usecase });
}

module.exports = { Server };
