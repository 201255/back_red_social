import { Router } from 'express';
import bodyParser from 'body-parser';
import { postController } from '../controllers/post.controller.js';
import  verifyToken  from '../middlewares/token.middleware.js'
import multer from 'multer';


const router = Router();

const jsonParser = bodyParser.json()

const urlencodedParser = bodyParser.urlencoded({ extended: false })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let destinationFolder = '';

    if (file.mimetype.includes('image')) {
      destinationFolder = './assets/image/';
    } else if (file.mimetype.includes('audio')) {
      destinationFolder = './assets/audio/';
    } else if (file.mimetype.includes('video')) {
      destinationFolder = './assets/video/';
    } else if (file.mimetype.includes('gif')) {
      destinationFolder = './assets/gif/';
    } else {
      destinationFolder = './assets/other/';
    }

    cb(null, destinationFolder);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
  
/**
 * @openapi
 * '/api/post/createPost':
 *  post:
 *     tags:
 *     - post
 *     summary: Create
 *     parameters:
 *       - in: header
 *         name: auth-token
 *         description: Token de autorización
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: user_id
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *           schema:
 *            type: object
 *            properties:
 *              texto:
 *                type: string
 *                default: Hola
 *              imagen:
 *                type: string
 *                format: binary
 *                default: imagen
 *     responses:
 *      200:
 *        description: Create
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Not Found
 */

router.post('/createPost',verifyToken,upload.single('imagen'), (req, res) =>postController.create_post(req, res));

/**
 * @openapi
 * '/api/post/viewPost':
 *   get:
 *     tags:
 *       - post
 *     summary: Obtener posts
 *     parameters:
 *       - in: query
 *         name: imagen
 *         description: Condición de búsqueda
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Solicitud incorrecta
 */

router.get('/viewPost', (req, res) =>postController.get_post(req, res));

/**
 * @openapi
 * '/api/post/viewAll':
 *   get:
 *     tags:
 *       - post
 *     summary: Obtener posts
 *     responses:
 *       200:
 *         description: Respuesta exitosa
 *       400:
 *         description: Solicitud incorrecta
 */

router.get('/viewAll', (req, res) =>postController.viewAll(req, res));


export default router;