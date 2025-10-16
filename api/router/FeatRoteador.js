module.exports = class FeatRoteador {
  #router
  #featMiddleware
  #featControl
  #jwtMiddleware

  constructor(
    routerDependency,
    jwtMiddlewareDependency,
    featMiddlewareDependency,
    featControlDependency
  ) {
    console.log('⬆️  FeatRoteador.constructor()')

    this.#router = routerDependency
    this.#jwtMiddleware = jwtMiddlewareDependency
    this.#featMiddleware = featMiddlewareDependency
    this.#featControl = featControlDependency
  }

  createRoutes = () => {
    console.log('⬆️  FeatRoteador.createRoutes()')

    this.#router.post(
      '/',
      this.#jwtMiddleware.validateToken,
      this.#featMiddleware.validateBody,
      this.#featControl.store.bind(this.#featControl)
    )

    this.#router.get(
      '/',
      this.#jwtMiddleware.validateToken,
      this.#featControl.index.bind(this.#featControl)
    )

    this.#router.get(
      '/:idFeat',
      this.#jwtMiddleware.validateToken,
      this.#featMiddleware.validateIdParam,
      this.#featControl.show.bind(this.#featControl)
    )

    this.#router.put(
      '/:idFeat',
      this.#jwtMiddleware.validateToken,
      this.#featMiddleware.validateIdParam,
      this.#featMiddleware.validateBody,
      this.#featControl.update.bind(this.#featControl)
    )

    this.#router.delete(
      '/:idFeat',
      this.#jwtMiddleware.validateToken,
      this.#featMiddleware.validateIdParam,
      this.#featControl.destroy.bind(this.#featControl)
    )

    return this.#router
  }
}
