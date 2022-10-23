const { prompt } = require('inquirer');

const COMMANDS = {
    DEPARTMENTS: {
        ADD                                                    /**/: undefined,
        REMOVE                                                 /**/: undefined,
        VIEW                                                   /**/: undefined,
        VIEW_SALARIES                                          /**/: undefined,
    },
    EMPLOYEES: {
        ADD                                                    /**/: undefined,
        REMOVE                                                 /**/: undefined,
        UPDATE_MANAGER                                         /**/: undefined,
        UPDATE_ROLE                                            /**/: undefined,
        VIEW                                                   /**/: undefined,
        VIEW_BY_DEPARTMENT                                     /**/: undefined,
        VIEW_BY_MANAGER                                        /**/: undefined,
    },
    ROLES: {
        ADD                                                    /**/: undefined,
        REMOVE                                                 /**/: undefined,
        VIEW                                                   /**/: undefined,
    },
    QUIT                                                       /**/: undefined,
}

function quit() {
    console.log("Goodbye!");
    process.exit();
}

function dispatch(query, controllers) {
    switch (query.choice) {
        //case COMMANDS.DEPARTMENTS.ADD: break;
        //case COMMANDS.DEPARTMENTS.REMOVE: break;
        //case COMMANDS.DEPARTMENTS.VIEW: break;
        //case COMMANDS.DEPARTMENTS.VIEW_SALARIES: break;
        //case COMMANDS.EMPLOYEES.ADD: break;
        //case COMMANDS.EMPLOYEES.REMOVE: break;
        //case COMMANDS.EMPLOYEES.UPDATE_MANAGER: break;
        //case COMMANDS.EMPLOYEES.UPDATE_ROLE: break;
        case COMMANDS.EMPLOYEES.VIEW: break;
        //case COMMANDS.EMPLOYEES.VIEW_BY_DEPARTMENT: break;
        //case COMMANDS.EMPLOYEES.VIEW_BY_MANAGER: break;
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
            //{ value: COMMANDS.DEPARTMENTS.ADD,              /**/ name: "Add Department"                           /**/, },
            //{ value: COMMANDS.DEPARTMENTS.REMOVE,           /**/ name: "Remove Department"                        /**/, },
            //{ value: COMMANDS.DEPARTMENTS.VIEW,             /**/ name: "View All Departments"                     /**/, },
            //{ value: COMMANDS.DEPARTMENTS.VIEW_SALARIES,    /**/ name: "View Total Utilized Budget By Department" /**/, },
            //{ value: COMMANDS.EMPLOYEES.ADD,                /**/ name: "Add employee"                             /**/, },
            //{ value: COMMANDS.EMPLOYEES.REMOVE,             /**/ name: "Remove employee"                          /**/, },
            //{ value: COMMANDS.EMPLOYEES.UPDATE_MANAGER,     /**/ name: "Update Employee Manager"                  /**/, },
            //{ value: COMMANDS.EMPLOYEES.UPDATE_ROLE,        /**/ name: "Update Employee Role"                     /**/, },
            { value: COMMANDS.EMPLOYEES.VIEW,               /**/ name: "View employees"                           /**/, },
            //{ value: COMMANDS.EMPLOYEES.VIEW_BY_DEPARTMENT, /**/ name: "View employees by department"             /**/, },
            //{ value: COMMANDS.EMPLOYEES.VIEW_BY_MANAGER,    /**/ name: "View employees by manager"                /**/, },
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