module.exports = class CantorRoteador {
  #router
  #cantorMiddleware
  #cantorControl
  #jwtMiddleware

  constructor(
    routerDependency,
    jwtMiddlewareDependency,
    cantorMiddlewareDependency,
    cantorControlDependency
  ) {
    console.log('⬆️  CantorRoteador.constructor()')

    this.#router = routerDependency
    this.#jwtMiddleware = jwtMiddlewareDependency
    this.#cantorMiddleware = cantorMiddlewareDependency
    this.#cantorControl = cantorControlDependency
  }

  createRoutes = () => {
    console.log('⬆️  CantorRoteador.createRoutes()')

    this.#router.post(
      '/',
      this.#jwtMiddleware.validateToken,
      this.#cantorMiddleware.validateBody,
      this.#cantorControl.store.bind(this.#cantorControl)
    )

    this.#router.get(
      '/',
      this.#jwtMiddleware.validateToken,
      this.#cantorControl.index.bind(this.#cantorControl)
    )

    this.#router.get(
      '/:idCantor',
      this.#jwtMiddleware.validateToken,
      this.#cantorMiddleware.validateIdParam,
      this.#cantorControl.show.bind(this.#cantorControl)
    )

    this.#router.put(
      '/:idCantor',
      this.#jwtMiddleware.validateToken,
      this.#cantorMiddleware.validateIdParam,
      this.#cantorMiddleware.validateBody,
      this.#cantorControl.update.bind(this.#cantorControl)
    )

    this.#router.delete(
      '/:idCantor',
      this.#jwtMiddleware.validateToken,
      this.#cantorMiddleware.validateIdParam,
      this.#cantorControl.destroy.bind(this.#cantorControl)
    )

    return this.#router
  }
}
