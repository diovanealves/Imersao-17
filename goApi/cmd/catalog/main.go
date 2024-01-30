package main

import (
	"database/sql"
	"fmt"
	"net/http"

	"github.com/diovanealves/imersao-17/goapi/internal/database"
	"github.com/diovanealves/imersao-17/goapi/internal/service"
	"github.com/diovanealves/imersao-17/goapi/internal/webserver"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/imersao17")
	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	categoryDb := database.NewCategoryDB(db)
	categoryService := service.NewCategoryService(*categoryDb)
	webCategoryHandler := webserver.NewWebCategoryHandler(categoryService)

	productDb := database.NewProductDB(db)
	productService := service.NewProductService(*productDb)
	webProducctHandler := webserver.NewWebProductHandler(productService)

	c := chi.NewRouter()
	c.Use(middleware.Logger)
	c.Use(middleware.Recoverer)

	c.Get("/category", webCategoryHandler.GetCategories)
	c.Get("/category/{id}", webCategoryHandler.GetCategory)
	c.Post("/category", webCategoryHandler.CreateCategory)

	c.Get("/product", webProducctHandler.GetProducts)
	c.Get("/product/{id}", webProducctHandler.GetProduct)
	c.Get("/product/category/{categoryID}", webProducctHandler.GetProductByCategoryID)
	c.Post("/product", webProducctHandler.CreateProduct)

	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", c)
}
