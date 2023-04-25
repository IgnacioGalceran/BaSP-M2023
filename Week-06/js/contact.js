var hamburguer = document.getElementsByClassName('header-menu');

hamburguer[0].addEventListener('click', menu);

var sidebar = document.getElementsByTagName('aside');

function menu() {
  if (sidebar[0].className === '') {
    sidebar[0].classList.add('sidebar-visible');
  } else {
    if (sidebar[0].className === 'sidebar-visible') {
      sidebar[0].classList.add('sidebar-none');
      sidebar[0].classList.remove('sidebar-visible');
    } else {
      sidebar[0].classList.add('sidebar-visible');
      sidebar[0].classList.remove('sidebar-none');
    }
  }
}
