import express from 'express';
import { isAuthenticated } from '../middlewares/isAuthenticated.js';
import { appliedJob, getApplicants, getAppliedJobs, updateStatus } from '../controllers/applicants.controller.js';

const Router = express.Router();

Router.route('/applyJob/:id').get(isAuthenticated, appliedJob);
Router.route('/getAppliedJobs').get(isAuthenticated, getAppliedJobs);
Router.route('/getApplicants/:id').get(isAuthenticated, getApplicants);
Router.route('/updateStatus/:id').put(isAuthenticated, updateStatus);

export default Router;