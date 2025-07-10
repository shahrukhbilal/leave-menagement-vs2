import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Badge,
  Form,
  Row,
  Col,
  Button,
} from 'react-bootstrap';

const LeaveStatusPage = () => {
  const [leaves, setLeaves] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [filteredLeaves, setFilteredLeaves] = useState([]);

  useEffect(() => {
    const fetchLeaves = async () => {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/leaves', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setLeaves(data);
        setFilteredLeaves(data); // initially show all
      }
    };

    fetchLeaves();
  }, []);

  // Filter handler
  const handleFilter = (e) => {
    e.preventDefault();
    const result = leaves.filter((leave) =>
      statusFilter ? leave.status === statusFilter : true
    );
    setFilteredLeaves(result);
  };

  return (
    <Container className="mt-5">
      <h3 className="mb-4 text-center">Your Leave Status</h3>

      {/* Bootstrap Filter Form */}
      <Form className="mb-4" onSubmit={handleFilter}>
        <Row className="align-items-end">
          <Col md={4}>
            <Form.Group controlId="statusFilter">
              <Form.Label>Filter by Status</Form.Label>
              <Form.Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="">All</option>
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={2}>
            <Button variant="primary" type="submit" className="w-100">
              Apply Filter
            </Button>
          </Col>
        </Row>
      </Form>

      {/* Leave Table */}
      <Table striped bordered hover responsive className="shadow">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Employee ID</th>
            <th>From Date</th>
            <th>To Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Total Days</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.length > 0 ? (
            filteredLeaves.map((leave, index) => {
              const from = new Date(leave.fromDate);
              const to = new Date(leave.toDate);
              const duration =
                Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;

              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{leave.employeeId}</td>
                  <td>{from.toLocaleDateString()}</td>
                  <td>{to.toLocaleDateString()}</td>
                  <td>{leave.reason}</td>
                  <td>
                    <Badge
                      bg={
                        leave.status === 'Approved'
                          ? 'success'
                          : leave.status === 'Pending'
                          ? 'warning'
                          : 'danger'
                      }
                      text={leave.status === 'Pending' ? 'dark' : 'light'}
                    >
                      {leave.status}
                    </Badge>
                  </td>
                  <td>{duration} day{duration > 1 ? 's' : ''}</td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">
                No leaves found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default LeaveStatusPage;
