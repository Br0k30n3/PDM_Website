    $(function () {
        $("#minMaxCheckBox").on("click", function () {
            if ($(this).is(":checked")) {
                $("#minAmount").removeAttr("disabled");
                $("#maxAmount2").removeAttr("disabled");
                $("#maxAmount").val("");
                $("#maxAmount").attr("disabled", "disabled");
                $("#maxCheckBox").prop("checked", false);
            } else if (!$(this).is(":checked")) {
                $("#minAmount").val("");
                $("#maxAmount2").val("");
                $("#minAmount").attr("disabled", "disabled");
                $("#maxAmount2").attr("disabled", "disabled");
            }
        });
        $("#maxCheckBox").on("click", function () {
            if ($(this).is(":checked")) {
                $("#maxAmount").removeAttr("disabled");
                $("#minMaxCheckBox").prop("checked", false);
                $("#minAmount").val("");
                $("#maxAmount2").val("");
                $("#minAmount").attr("disabled", "disabled");
                $("#maxAmount2").attr("disabled", "disabled");
            } else if (!$(this).is(":checked")) {
                $("#maxAmount").val("");
                $("#maxAmount").attr("disabled", "disabled");
            }
        });
    });




    $(function () {
        $(document).ready(function () {
            $(window).keydown(function (event) {
                if (event.keyCode == 13) {
                    event.preventDefault();
                    return false;
                }
            });
        });



        $("#Search").on("click", function () {
            // Pricing Checks
            const maxPrice = $("#maxAmount").val();
            const maxPrice2 = $("#maxAmount2").val();
            const maxPriceLength = $("#maxAmount").val().length;
            const maxPriceLength2 = $("#maxAmount2").val().length;
            const minPriceLength = $("#minAmount").val().length;
            let price = false;
            let priceRange = false;
            let paymentOption = false;
            let maxprice2_b = false;
            let minPrice_b = false;
            let minPrice = 0;

            // If Maximimum Price text Input has any characters in it, price is set to true, if not, it's set to false
            if (maxPriceLength > 0 && $("#maxCheckBox").is(":checked")) {
                price = true
                console.log("price = true")
            } else if (maxPriceLength == 0) {
                price = false
            }
            if (maxPriceLength2 > 0 && $("#minMaxCheckBox").is(":checked")) {
                maxprice2_b = true
            } else if (maxPriceLength2 == 0) {
                maxprice2_b = false
            }
            if (minPriceLength > 0 && $("#minMaxCheckBox").is(":checked")) {
                minPrice_b = true
                minPrice = $("#minAmount").val()
            } else if (minPriceLength == 0) {
                minPrice_b = false
            }

            if (minPrice_b || maxprice2_b) {
                priceRange = true
            } else if (!minPrice_b || !maxprice2_b) {
                priceRange = false;
            }

            // Check if Payment Option checkboxes are checked, if so, the payment option checkbox filters are enabled,if not, the search ignores them
            if ($('[name="paymentOption"]:checked').length > 0) {
                paymentOption = true;
            } else if ($('[name="paymentOption"]:checked').length == 0) {
                paymentOption = false;
            }
            // Pricing Checks END


            // Category Check
            // let carType = false;
            // const carChecked = false;

            // Check if Car type Checkboxes are checked
            // if ($('[name="cars"]:checked').length > 0) {
            //     carType = true
            // } else if ($('[name="cars"]:checked').length == 0) {
            //     carType = false
            // }

            // Category Check END

            // Speed Check
            let speedLevel = false;

            if ($('[name="speedLevels"]:checked').length > 0) {
                speedLevel = true;
            } else if ($('[name="speedLevels"]:checked').length == 0) {
                speedLevel = false;
            }
            // Speed Check END

            // Occupacy Check
            // let occupacy = false;

            // if ($('[name="occupacies"]:checked').length > 0) {
            //     occupacy = true;
            // } else if ($('[name="occupacies"]:checked').length == 0) {
            //     occupacy = false;
            // }




            let output = "<ul>";
            $.getJSON('inventory.json', function (data) {
                for (let i in data.cars) {
                    let carPrice = data.cars[i].price;
                    const finance = Math.round(carPrice * 0.3333);

                    const purchaseCard = "<li><div class='card' style='background-image: url(" + data.cars[i].carImg + ")'>" + "<div class='vehicleImg'>"+ "<h1 class='carName'>" + data.cars[i].name + "</h1>" + "<h2 class='carType'>Car Type: " + data.cars[i].carType + "</h2></div><div class='info'>" + "<h3 class='financing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div></h3>" + "<div class='speed-section'><div class='speed-container'><h3>Speed Level</h3><h3>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</h3></div>" + "<div class='speed-container'><h3>Max Speed</h3><h3>" + data.cars[i].maxSpeedUpgraded + "</h3></div></div>" + "</div></div></li>";

                    const financeCard = "<li><div class='card' style='background-image: url(" + data.cars[i].carImg + ")'>" + "<div class='vehicleImg'>"+ "<h1 class='carName'>" + data.cars[i].name + "</h1>" + "<h2 class='carType'>Car Type: " + data.cars[i].carType + "</h2></div>" + "<div class='info'><h1 class='carName'>" + "<h3 class='financing'><div class='price-section'>Finance Price<li class='price-list'>" + "$" + finance.toLocaleString('en-us') + "</li></div></h3>" + "<div class='speed-section'><div class='speed-container'><h3>Speed Level</h3><h3>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</h3></div>" + "<div class='speed-container'><h3>Max Speed</h3><h3>" + data.cars[i].maxSpeedUpgraded + "</h3></div></div>" + "</div></div></li>";

                    const card = "<li><div class='card' style='background-image: url(" + data.cars[i].carImg + ")'>" + "<div class='vehicleImg'><h1 class='carName'>" + data.cars[i].name + "</h1>" + "<h2 class='carType'>Car Type: " + data.cars[i].carType + "</h2>" + "</div>" + "<div class='info'>" + "<h3 class='pricing'><div class='price-section'>Purchase Price<li class='price-list'>" + "$" + data.cars[i].price.toLocaleString('en-us') + "</li></div>" + "<div class='price-section'>Finance Price<li class='price-list'>" + "$" + finance.toLocaleString('en-us') + "</li></div></h3>" + "<div class='speed-section'><div class='speed-container'><h3>Speed Level</h3><h3>" + data.cars[i].speedLevel.toLocaleString('en-us') + "</h3></div>" + "</div></div></div></li>";

                    if (speedLevel == true) {
                        $('[name="speedLevels"]:checked').each(function (checkbox) {
                            if ($(this).val() == data.cars[i].speedLevel) {
                                // If only one of the checkboxes are marked
                                if ($('[name="paymentOption"]:checked').length == 1) {
                                    // if the checkbox marked is for purchase onlyy
                                    if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                        if (data.cars[i].price <= maxPrice && price == true) {
                                            output += purchaseCard
                                        } else if (price == false && priceRange == false) {
                                            output += purchaseCard
                                        } else if (price == false && minPrice_b == true) {
                                            if (maxprice2_b == true) {
                                                if (data.cars[i].price >= minPrice) {
                                                    if (data.cars[i].price <= maxPrice2) {
                                                        output += purchaseCard
                                                    }
                                                }
                                            } else if (data.cars[i].price >= minPrice) {
                                                output += purchaseCard
                                            }
                                        } else if (price == false && maxprice2_b == true) {
                                            if (minPrice_b == true) {
                                                if (data.cars[i].price >= minPrice) {
                                                    if (data.cars[i].price <= maxPrice2) {
                                                        output += purchaseCard
                                                    }
                                                }
                                            } else if (maxPrice2 >= data.cars[i].price) {
                                                output += purchaseCard
                                            }
                                        }
                                    } else {
                                        if (finance <= maxPrice && price == true) {
                                            output += financeCard
                                        } else if (price == false && priceRange == false) {
                                            output += financeCard
                                        } else if (price == false && minPrice_b == true) {
                                            if (maxprice2_b == true) {
                                                console.log(maxprice2_b)
                                                if (finance >= minPrice) {
                                                    console.log(minPrice)
                                                    if (data.cars[i].price <= maxPrice2) {
                                                        output += financeCard
                                                    }
                                                }
                                            } else if (finance >= minPrice) {
                                                output += financeCard
                                            }
                                        } else if (price == false && maxprice2_b == true) {
                                            if (minPrice_b == true) {
                                                if (finance >= minPrice) {
                                                    if (finance <= maxPrice2) {
                                                        output += financeCard
                                                    }
                                                }
                                            } else if (maxPrice2 >= data.cars[i].price) {
                                                output += financeCard
                                            }
                                        }
                                    }
                                } else {
                                    // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                                    if (price == true && carPrice <= maxPrice) {
                                        output += card
                                    } else if (price == false && priceRange == false) {
                                        output += card
                                    } else if (price == false && minPrice_b == true) {
                                        if (maxprice2_b == true) {
                                            if (data.cars[i].price >= minPrice) {
                                                if (data.cars[i].price <= maxPrice2) {
                                                    output += card
                                                }
                                            }
                                        } else if (data.cars[i].price >= minPrice) {
                                            output += card
                                        }
                                    } else if (price == false && maxprice2_b == true) {
                                        if (minPrice_b == true) {
                                            if (data.cars[i].price >= minPrice) {
                                                if (data.cars[i].price <= maxPrice2) {
                                                    output += card
                                                }
                                            }
                                        } else if (maxPrice2 >= data.cars[i].price) {
                                            output += card
                                        }
                                    }
                                }
                            }
                        });


                    } else {
                        // If only one of the checkboxes are marked
                        if ($('[name="paymentOption"]:checked').length == 1) {
                            // if the checkbox marked is for purchase onlyy
                            if ($('[name="paymentOption"]:checked').val() == 'purchase') {
                                if (data.cars[i].price <= maxPrice && price == true) {
                                    output += purchaseCard
                                } else if (price == false && priceRange == false) {
                                    output += purchaseCard
                                } else if (price == false && minPrice_b == true) {
                                    if (maxprice2_b == true) {
                                        if (data.cars[i].price >= minPrice) {
                                            if (data.cars[i].price <= maxPrice2) {
                                                output += purchaseCard
                                            }
                                        }
                                    } else if (data.cars[i].price >= minPrice) {
                                        output += purchaseCard
                                    }
                                } else if (price == false && maxprice2_b == true) {
                                    if (minPrice_b == true) {
                                        if (data.cars[i].price >= minPrice) {
                                            if (data.cars[i].price <= maxPrice2) {
                                                output += purchaseCard
                                            }
                                        }
                                    } else if (maxPrice2 >= data.cars[i].price) {
                                        output += purchaseCard
                                    }
                                }
                            } else {
                                // If the checkbox checked is for Finance only 
                                if (finance <= maxPrice && price == false) {
                                    output += financeCard
                                } else if (price == false && priceRange == false) {
                                    output += financeCard
                                } else if (price == false && minPrice_b == true) {
                                    if (maxprice2_b == true) {
                                        if (finance >= minPrice) {
                                            if (finance <= maxPrice2) {
                                                output += financeCard
                                            }
                                        } else if (finance <= maxPrice2) {
                                            if (finance >= minPrice) {
                                                output += financeCard
                                            }
                                        }
                                    } else if (finance >= minPrice) {
                                        output += financeCard
                                    }
                                } else if (price == false && maxprice2_b == true) {
                                    if (minPrice_b == true) {
                                        if (finance >= minPrice) {
                                            if (finance <= maxPrice2) {
                                                output += financeCard
                                            }
                                        } else if (finance <= maxPrice2) {
                                            if (finance >= minPrice) {
                                                output += financeCard
                                            }
                                        }
                                    } else if (maxPrice2 >= finance) {
                                        output += financeCard
                                    }
                                }
                            }
                        } else {
                            // if no Payment Options are selected, they are not considered in the search, or if both of them are checked, the results will be the same
                            if (price == true && carPrice <= maxPrice) {
                                output += card
                            } else if (price == false && priceRange == false) {
                                output += card
                            } else if (price == false && minPrice_b == true) {
                                if (maxprice2_b == true) {
                                    if (data.cars[i].price >= minPrice) {
                                        if (data.cars[i].price <= maxPrice2) {
                                            output += card
                                        }
                                    }
                                } else if (data.cars[i].price >= minPrice) {
                                    output += card
                                }
                            } else if (price == false && maxprice2_b == true) {
                                if (minPrice_b == true) {
                                    if (data.cars[i].price >= minPrice) {
                                        if (data.cars[i].price <= maxPrice2) {
                                            output += card
                                        }
                                    }
                                } else if (maxPrice2 >= data.cars[i].price) {
                                    output += card
                                }
                            }
                        }
                    }


                }
                output += "</ul>";
                document.getElementById("Placeholder").innerHTML = output;
            });

        })
    })