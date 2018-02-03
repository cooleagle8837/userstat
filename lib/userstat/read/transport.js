module.exports = ({ read, log, auth, validate, reply, replyError }) =>
  (event, context, cb) => {
    log('request', event);

    return auth({ event }) // default is simple Bearer Token
      .then(validate('/~1/get/parameters'))
      .then(() => read(event.pathParameters.id)
        .then(result => cb(null, reply({
          body: { msg: 'OK', data: result },
        })))
        .catch(err => cb(null, replyError({ event, err })))
      )
      .catch(result => cb(null, result)); // auth & validate return apig.reply*
  };