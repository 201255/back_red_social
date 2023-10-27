import { Router } from 'express';
import bodyParser from 'body-parser';
import { reactionController } from '../controllers/reaction.controller.js';


const router = Router();

const jsonParser = bodyParser.json()
 
const urlencodedParser = bodyParser.urlencoded({ extended: false })


/**
 * @openapi
 * '/api/reaction/createReaction':
 *  post:
 *     tags:
 *     - reaction
 *     summary: visualizar
 *     parameters:
 *       - in: query
 *         name: user_id
 *         description: ID del usuario
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: post_id
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/createReaction', (req, res) => reactionController.reaction_create(req, res));

/**
 * @openapi
 * '/api/reaction/deleteReaction':
 *  delete:
 *     tags:
 *     - reaction
 *     summary: delete
 *     parameters:
 *       - in: query
 *         name: user_id
 *         description: ID del usuario
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: post_id
 *         description: ID del post
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      200:
 *        description: View
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */


router.delete('/deleteReaction', (req, res) => reactionController.reaction_delete(req, res));


export default router;