module.exports = class GravadoraRoteador {
  #router
  #gravadoraMiddleware
  #gravadoraControl
  #jwtMiddleware

  constructor(
    routerDependency,
    jwtMiddlewareDependency,
    gravadoraMiddlewareDependency,
    gravadoraControlDependency
  ) {
    console.log('⬆️  GravadoraRoteador.constructor()')

    this.#router = routerDependency
    this.#jwtMiddleware = jwtMiddlewareDependency
    this.#gravadoraMiddleware = gravadoraMiddlewareDependency
    this.#gravadoraControl = gravadoraControlDependency
  }

  createRoutes = () => {
    console.log('⬆️  GravadoraRoteador.createRoutes()')

    this.#router.post(
      '/',
      this.#jwtMiddleware.validateToken,
      this.#gravadoraMiddleware.validateBody,
      this.#gravadoraControl.store.bind(this.#gravadoraControl)
    )

    this.#router.get(
      '/',
      this.#jwtMiddleware.validateToken,
      this.#gravadoraControl.index.bind(this.#gravadoraControl)
    )

    this.#router.get(
      '/:idGravadora',
      this.#jwtMiddleware.validateToken,
      this.#gravadoraMiddleware.validateIdParam,
      this.#gravadoraControl.show.bind(this.#gravadoraControl)
    )

    this.#router.put(
      '/:idGravadora',
      this.#jwtMiddleware.validateToken,
      this.#gravadoraMiddleware.validateIdParam,
      this.#gravadoraMiddleware.validateBody,
      this.#gravadoraControl.update.bind(this.#gravadoraControl)
    )

    this.#router.delete(
      '/:idGravadora',
      this.#jwtMiddleware.validateToken,
      this.#gravadoraMiddleware.validateIdParam,
      this.#gravadoraControl.destroy.bind(this.#gravadoraControl)
    )

    return this.#router
  }
}
