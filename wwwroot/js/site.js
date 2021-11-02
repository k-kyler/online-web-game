﻿// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
$(document).ready(() => {
    // Configure styles for nav item active
    let navItemActive = sessionStorage.getItem("nav-item-active");
    
    if (navItemActive) {
        $(`#navbarNav .nav-item:nth-child(${navItemActive})`).addClass("active");
    } else {
        $(`#navbarNav .nav-item:nth-child(1)`).addClass("active");
    }
    
    $(".navbar-brand").click(() => {
        sessionStorage.setItem("nav-item-active", 1)
    });
    
    $("#navbarNav .nav-item:nth-child(1)").click(() => {
        sessionStorage.setItem("nav-item-active", 1)
    });
    
    $("#navbarNav .nav-item:nth-child(2)").click(() => {
        sessionStorage.setItem("nav-item-active", 2)
    });
    
    $("#navbarNav .nav-item:nth-child(3)").click(() => {
        sessionStorage.setItem("nav-item-active", 3)
    });

    $("#navbarNav .nav-item:nth-child(4)").click(() => {
        sessionStorage.setItem("nav-item-active", 4)
    });
    
    // Force setting modal to hide when open exit game modal
    $("#exitGameConfirm").click(() => {
        $("#myModal1").modal("hide")
        $(".modal-backdrop").css("display", "none")
    })
})