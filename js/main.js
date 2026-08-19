/* Gilbert Yiga — progressive enhancement only. The page works without this file. */

(function () {
  "use strict";

  /* Current year in the footer, so it never goes stale. */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* Shadow under the header once the page has scrolled. */
  var header = document.getElementById("site-header");
  if (header) {
    var sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    document.body.prepend(sentinel);

    new IntersectionObserver(function (entries) {
      header.dataset.stuck = String(!entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* Highlight the nav link for whichever section is in view. */
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = links
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if (sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        links.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(function (section) { spy.observe(section); });
  }

  /* Fade case studies in as they arrive. */
  var reveals = document.querySelectorAll(".reveal");
  if (!reveals.length) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    reveals.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }

  var revealer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -10% 0px" });

  reveals.forEach(function (el) { revealer.observe(el); });
})();
