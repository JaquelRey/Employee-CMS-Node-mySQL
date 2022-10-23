const { prompt } = require('inquirer');

const COMMANDS = {
    EMPLOYEES_VIEW                                             /**/: undefined,
    EMPLOYEES_VIEW_BY_DEPARTMENT                               /**/: undefined,
    EMPLOYEES_VIEW_BY_MANAGER                                  /**/: undefined,
    EMPLOYEES_ADD                                              /**/: undefined,
    EMPLOYEES_REMOVE                                           /**/: undefined,
    EMPLOYEES_UPDATE_ROLE                                      /**/: undefined,
    EMPLOYEES_UPDATE_MANAGER                                   /**/: undefined,
    ROLES_VIEW                                                 /**/: undefined,
    ROLES_ADD                                                  /**/: undefined,
    ROLES_REMOVE                                               /**/: undefined,
    DEPARTMENTS_VIEW                                           /**/: undefined,
    DEPARTMENTS_ADD                                            /**/: undefined,
    DEPARTMENTS_REMOVE                                         /**/: undefined,
    DEPARTMENTS_VIEW_SALARIES                                  /**/: undefined,
    QUIT                                                       /**/: undefined,
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}

function dispatch(query, controllers) {
    switch (query.choice) {
        //case COMMANDS.DEPARTMENTS_ADD: break;
        //case COMMANDS.DEPARTMENTS_REMOVE: break;
        //case COMMANDS.DEPARTMENTS_VIEW_SALARIES: break;
        //case COMMANDS.DEPARTMENTS_VIEW: break;
        //case COMMANDS.EMPLOYEES_ADD: break;
        //case COMMANDS.EMPLOYEES_REMOVE: break;
        //case COMMANDS.EMPLOYEES_UPDATE_MANAGER: break;
        //case COMMANDS.EMPLOYEES_UPDATE_ROLE: break;value
        //case COMMANDS.EMPLOYEES_VIEW_BY_DEPARTMENT: break;
        //case COMMANDS.EMPLOYEES_VIEW_BY_MANAGER: break;
        case COMMANDS.EMPLOYEES_VIEW:

            break;
        //case COMMANDS.ROLES_ADD: break;
        //case COMMANDS.ROLES_REMOVE: break;
        //case COMMANDS.ROLES_VIEW: break;
        case COMMANDS.QUIT:
        default:
            return quit();
    }
}

module.exports = function ({ controllers, utils }) {
    utils.toEnum(COMMANDS);

    const QUERIES = Object.freeze({
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
            //{ value: COMMANDS.DEPARTMENTS_ADD,              /**/ name: "Add Department"                           /**/, },
            //{ value: COMMANDS.DEPARTMENTS_REMOVE,           /**/ name: "Remove Department"                        /**/, },
            //{ value: COMMANDS.DEPARTMENTS_REMOVE,           /**/ name: "Remove employee"                          /**/, },
            //{ value: COMMANDS.DEPARTMENTS_VIEW_SALARIES,    /**/ name: "View Total Utilized Budget By Department" /**/, },
            //{ value: COMMANDS.DEPARTMENTS_VIEW,             /**/ name: "View All Departments"                     /**/, },
            //{ value: COMMANDS.EMPLOYEES_ADD,                /**/ name: "Add employee"                             /**/, },
            //{ value: COMMANDS.EMPLOYEES_UPDATE_MANAGER,     /**/ name: "Update Employee Manager"                  /**/, },
            //{ value: COMMANDS.EMPLOYEES_UPDATE_ROLE,        /**/ name: "Update Employee Role"                     /**/, },
            //{ value: COMMANDS.EMPLOYEES_VIEW_BY_DEPARTMENT, /**/ name: "View employees by department"             /**/, },
            //{ value: COMMANDS.EMPLOYEES_VIEW_BY_MANAGER,    /**/ name: "View employees by manager"                /**/, },
            { value: COMMANDS.EMPLOYEES_VIEW,               /**/ name: "View employees"                           /**/, },
            //{ value: COMMANDS.ROLES_ADD,                    /**/ name: "Add Role"                                 /**/, },
            //{ value: COMMANDS.ROLES_REMOVE,                 /**/ name: "Remove Role"                              /**/, },
            //{ value: COMMANDS.ROLES_VIEW,                   /**/ name: "View All Roles"                           /**/, },
            { value: COMMANDS.QUIT,                         /**/ name: "Quit"                                     /**/, },

        ],
    });

    this.display = async function display() {
        return dispatch(await prompt([QUERIES]), controllers);
    }
}