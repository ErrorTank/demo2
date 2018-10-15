export const ticketUtils = {
    getProvider: (outing = null) => outing && outing.organization && outing.organization.ticketing_provider_config
        ? (outing.organization.ticketing_provider_config.ticketing_provider || 0)
        : outing.event && outing.event.organization && outing.event.organization.ticketing_provider_config
            ? outing.event.organization.ticketing_provider_config.ticketing_provider
            : 0
};
