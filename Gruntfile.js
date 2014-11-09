module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-markdown-pdf');
  grunt.initConfig({
    markdownpdf: {
      options: {
        // Task specific options go here
        concat: true
      },
      files: {
        // Target-specific file lists and/or options go here.
        src: 'generated_chapters/*.md',
        dest: 'generated_chapters/pirates_vikings_aliens_dinosaurs.pdf'
      }
    }
  });
};
