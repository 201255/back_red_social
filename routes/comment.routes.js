import { Router } from 'express';
import bodyParser from 'body-parser';
import { commentController } from '../controllers/comment.controller.js';


const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })

/**
 * @openapi
 * '/api/comment/create':
 *  post:
 *     tags:
 *     - comment
 *     summary: crear
 *     parameters:
 *       - in: header
 *         name: auth-token
 *         description: Token de autorización
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: post_id
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            properties:
 *              name:
 *                type: string
 *                default: luis
 *              comment:
 *                type: string
 *                default: hola
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/create', (req, res) => commentController.comment_create(req, res));

/**
 * @openapi
 * '/api/comment/view':
 *   get:
 *     tags:
 *       - comment
 *     summary: Obtener comment
 *     parameters:
 *       - in: query
 *         name: post_id
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Solicitud incorrecta
 */

router.get('/view', (req, res) =>commentController.view(req, res));



export default router;