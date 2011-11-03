$.fx.off = true;
jasmine.getFixtures().fixturesPath = 'spec/fixtures';

function insertFixtures(fixtures) {
  loadFixtures(fixtures);
  ich.refresh();
}
