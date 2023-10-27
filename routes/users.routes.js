import { Router } from 'express';
import bodyParser from 'body-parser';
import { userController } from '../controllers/user.controller.js';

const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/user/createUser':
 *  post:
 *     tags:
 *     - user
 *     summary: Create
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - lastname
 *              - email
 *              - pass
 *            properties:
 *              name:
 *                type: string
 *                default: luis
 *              lastname:
 *                type: string
 *                default: cruz
 *              email:
 *                type: string
 *                default: luis@gmail.com
 *              pass:
 *                type: string
 *                default: 1234
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/createUser', (req, res) =>userController.user_create(req, res));

/**
 * @openapi
 * '/api/user/login':
 *  post:
 *     tags:
 *     - user
 *     summary: Incio de Sesion
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - name
 *              - pass
 *            properties:
 *              name:
 *                type: string
 *                default: luis
 *              pass:
 *                type: string
 *                default: 1234
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.post('/login', (req, res) =>userController.user_login(req, res));

/**
 * @openapi
 * '/api/user/viewAll':
 *  get:
 *     tags:
 *     - user
 *     summary: visualizar
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.get('/viewAll', (req, res) => userController.user_viewAll(req, res));

// /**
//  * @openapi
//  * '/api/user/delete':
//  *   delete:
//  *     tags:
//  *       - user
//  *     summary: eliminar
//  *     parameters:
//  *       - in: query
//  *         id: id
//  *         description: Condición de búsqueda
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: Respuesta exitosa
//  *       400:
//  *         description: Solicitud incorrecta
//  */

// router.delete("/delete", (req, res) => userController.user_delete(req, res));

// /**
//  * @openapi
//  * '/api/user/update':
//  *  put:
//  *     tags:
//  *     - user
//  *     summary: actualizar 
//  *     parameters:
//  *       - in: query
//  *         id: id
//  *         description: Condición de búsqueda
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *      required: true
//  *      content:
//  *        application/json:
//  *           schema:
//  *            type: object
//  *            required:
//  *              - nombre
//  *              - apellido
//  *            properties:
//  *              nombre:
//  *                type: string
//  *                default: daniel
//  *              apellido:
//  *                type: string
//  *                default: gomez
//  *     responses:
//  *      200:
//  *        description: Create
//  *      400:
//  *        description: Bad Request
//  *      404:
//  *        description: Not Found
//  */

// router.put('/update',(req, res) => userController.user_update(req, res));

export default router;