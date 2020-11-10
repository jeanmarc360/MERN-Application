import contactController from './controller/contactController';
// Initialize express router
const router = require('express').Router();
// Set default API response
router.get('/', (req, res) => {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RESTHub crafted with love!',
    });
});

// Contact routes
router.route('/contacts')
    .get(contactController.index)
    .post(contactController.newContact);
router.route('/contacts/:contact_id')
    .get(contactController.view)
    .patch(contactController.update)
    .put(contactController.update)
    .delete(contactController.deleteContact);
// Export API routes
export default router;