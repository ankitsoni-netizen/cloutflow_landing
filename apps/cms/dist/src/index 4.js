"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    register() { },
    async bootstrap({ strapi }) {
        const publicRole = await strapi
            .query('plugin::users-permissions.role')
            .findOne({ where: { type: 'public' } });
        if (!publicRole)
            return;
        const permissions = [
            { action: 'api::story.story.find' },
            { action: 'api::story.story.findOne' },
            { action: 'api::insight.insight.find' },
            { action: 'api::insight.insight.findOne' },
            { action: 'api::job.job.find' },
            { action: 'api::job.job.findOne' },
        ];
        for (const perm of permissions) {
            const existing = await strapi
                .query('plugin::users-permissions.permission')
                .findOne({
                where: {
                    role: publicRole.id,
                    action: perm.action,
                },
            });
            if (!existing) {
                await strapi.query('plugin::users-permissions.permission').create({
                    data: {
                        action: perm.action,
                        role: publicRole.id,
                    },
                });
            }
        }
    },
};
